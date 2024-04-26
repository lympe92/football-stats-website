import { Injectable } from '@angular/core';
import { Observable, filter, forkJoin, from, map } from 'rxjs';
import { Post } from 'src/app/shared/models/post';
import { PostCategory } from 'src/app/shared/models/post-category';
import { AngularFireDatabase } from '@angular/fire/compat/database';
import {
  child,
  endBefore,
  equalTo,
  get,
  getDatabase,
  limitToLast,
  orderByChild,
  orderByKey,
  query,
  ref,
  remove,
  set,
} from 'firebase/database';

@Injectable({
  providedIn: 'root',
})
export class FirebaseApiService {
  constructor(private db: AngularFireDatabase) {}

  saveCategory(category: PostCategory): Observable<void> {
    const db = getDatabase();
    return from(
      set(
        ref(db, `categories/${category.title}`),
        JSON.parse(JSON.stringify(category))
      )
    );
  }

  deleteCategory(category: PostCategory): Observable<void> {
    const db = getDatabase();
    return from(remove(ref(db, `categories/${category.title}`)));
  }

  fetchCategories(): Observable<PostCategory[]> {
    const dbRef = ref(getDatabase());
    return from(get(child(dbRef, `categories`))).pipe(
      map((ref) => {
        if (ref.exists()) return ref.val();
      }),
      filter((val) => val !== undefined),
      map((response: PostCategory[]) => {
        let postCategories: PostCategory[] = [];
        for (const key in response) {
          if (response.hasOwnProperty(key))
            postCategories.push({ ...response[key] });
        }
        return postCategories;
      })
    );
  }

  savePost(post: Post): Observable<void> {
    const db = getDatabase();
    return from(
      set(
        ref(db, `posts/${post.status}/${-post?.timestamp}`),
        JSON.parse(JSON.stringify(post))
      )
    );
  }

  updatePost(post: Post): Observable<void> {
    const db = getDatabase();
    return from(
      set(
        ref(db, `posts/${post.status}/${-post?.timestamp}`),
        JSON.parse(JSON.stringify(post))
      )
    );
  }

  deletePost(post: Post): Observable<void> {
    const db = getDatabase();
    return from(remove(ref(db, `posts/${post.status}/${-post?.timestamp}`)));
  }

  fetchPosts(): Observable<Post[]> {
    const dbRef = ref(getDatabase());
    return from(get(child(dbRef, `posts`))).pipe(
      map((ref) => {
        if (ref.exists()) return ref.val();
      }),
      filter((val) => val !== undefined),
      map(({ draft, visible }: any) => {
        let posts = [
          ...(Object.values(draft ?? []) as Post[]),
          ...(Object.values(visible ?? []) as Post[]),
        ];

        posts?.sort((a: any, b: any) => a.timestamp - b.timestamp);

        return posts;
      })
    );
  }

  fetchPost(timestamp: string): Observable<any> {
    const dbRef = ref(getDatabase());
    return from(get(child(dbRef, `posts/visible/${-timestamp}`))).pipe(
      map((ref) => {
        if (ref.exists()) return ref.val();
      }),
      filter((val) => val !== undefined)
    );
  }

  fetchNextFiveVisiblePosts(lastPost?: any): Observable<any> {
    const dbRef = ref(getDatabase());

    const postsRef = child(dbRef, `posts/visible`);

    const queryRef =
      lastPost != undefined
        ? query(
            postsRef,
            orderByKey(),
            endBefore((-lastPost).toString()),
            limitToLast(5)
          )
        : query(postsRef, limitToLast(5));

    return from(get(queryRef)).pipe(
      map((response: any) => {
        if (!response.val()) return [];

        let posts = [...(Object.values(response.val() ?? []) as Post[])];

        posts?.sort((a: any, b: any) => b.timestamp - a.timestamp);

        return posts;
      })
    );
  }

  fetchPostsByCategory(
    categoryToFilter: string,
    postsNumber?: number
  ): Observable<Post[]> {
    const dbRef = ref(getDatabase());
    const postsRef = child(dbRef, `posts/visible`);

    const queryRef = postsNumber
      ? query(
          postsRef,
          orderByChild(`categories/${categoryToFilter}`),
          equalTo(true),
          limitToLast(postsNumber)
        )
      : query(
          postsRef,
          orderByChild(`categories/${categoryToFilter}`),
          equalTo(true)
        );

    return from(get(queryRef)).pipe(
      map((response: any) => {
        let posts = [...(Object.values(response.val() ?? []) as Post[])];

        posts?.sort((a: any, b: any) => b.timestamp - a.timestamp);

        return posts;
      })
    );
  }

  fetchFilteredPosts(
    statusToFilter: any,
    categoryToFilter: any
  ): Observable<Post[]> {
    let queriesList: any = [];

    queriesList = this.getQueriesListForStatusesAndCategories(
      statusToFilter,
      categoryToFilter
    );
    let posts: Post[] = [];
    return forkJoin(queriesList).pipe(
      map((snapshot: any) => {
        snapshot.forEach((childSnapshot: any) => {
          const postData = childSnapshot.val();
          if (!postData) return;
          posts = [...posts, ...(Object.values(postData) as Post[])];
        });
        posts?.sort((a: any, b: any) => b.timestamp - a.timestamp);

        return posts;
      })
    );
  }

  getQueriesListForStatusesAndCategories(
    statusToFilter: any,
    categoryToFilter: any
  ): Observable<any>[] {
    const dbRef = ref(getDatabase());
    let queriesList: Observable<any>[] = [];

    //Guard if status field is empty.
    if (statusToFilter.length === 0) statusToFilter = ['draft', 'visible'];

    statusToFilter.forEach((status: string) => {
      const postsRef = child(dbRef, `posts/${status}`);

      //Guard if Categories field is empty
      if (categoryToFilter.length === 0) queriesList.push(from(get(postsRef)));

      categoryToFilter.forEach((category: any) => {
        const queryRef = query(
          postsRef,
          orderByChild(`categories/${category}`),
          equalTo(true)
        );
        queriesList.push(from(get(queryRef)));
      });
    });

    return queriesList;
  }
}
