import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { UserWrapperComponent } from './components/user-wrapper/user-wrapper.component';
import { LivescoresComponent } from './components/livescores/livescores.component';
import { StandingsComponent } from './components/standings/standings.component';
import { StatisticsComponent } from './components/statistics/statistics.component';
import { HomepageComponent } from './components/homepage/homepage.component';
import { MatchPreviewComponent } from './components/livescores/match-preview/match-preview.component';
import { PostPreviewComponent } from '../shared/components/post-preview/post-preview.component';
import { NewsByCategoryComponent } from './components/news-by-category/news-by-category.component';

const routes: Routes = [
  {
    path: '',
    component: UserWrapperComponent,
    children: [
      { path: '', component: HomepageComponent },
      { path: 'livescores', component: LivescoresComponent },
      { path: 'match-preview/:matchId', component: MatchPreviewComponent },
      { path: 'categories/:category', component: NewsByCategoryComponent },
      { path: 'standings/:leagueId/:season', component: StandingsComponent },
      { path: 'standings/:leagueId', component: StandingsComponent },
      { path: 'statistics/:leagueId/:season', component: StatisticsComponent },
      { path: 'statistics/:leagueId', component: StatisticsComponent },
      { path: 'post/:postId/:postTitle', component: PostPreviewComponent },
    ],
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class UserRoutingModule {}
