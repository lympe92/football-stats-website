import { NgModule, OnInit } from '@angular/core';
import { SharedModule } from '../shared/shared.module';
import { StandingsComponent } from './components/standings/standings.component';
import { StatisticsComponent } from './components/statistics/statistics.component';
import { FooterComponent } from './components/footer/footer.component';
import { MenuComponent } from './components/menu/menu.component';
import { LivescoresComponent } from './components/livescores/livescores.component';
import { UserWrapperComponent } from './components/user-wrapper/user-wrapper.component';
import { RouterModule } from '@angular/router';
import { CommonModule } from '@angular/common';
import { HomepageComponent } from './components/homepage/homepage.component';
import { PostHeaderCardComponent } from './components/post-header-card/post-header-card.component';
import { MatchPreviewComponent } from './components/livescores/match-preview/match-preview.component';
import { BasicPostComponent } from './components/basic-post/basic-post.component';
import { NewsByCategoryComponent } from './components/news-by-category/news-by-category.component';
import { LeagueOptionsComponent } from './components/league-options/league-options.component';

@NgModule({
  declarations: [
    StandingsComponent,
    StatisticsComponent,
    FooterComponent,
    MenuComponent,
    LivescoresComponent,
    UserWrapperComponent,
    HomepageComponent,
    PostHeaderCardComponent,
    MatchPreviewComponent,
    BasicPostComponent,
    NewsByCategoryComponent,
    LeagueOptionsComponent,
  ],
  imports: [CommonModule, RouterModule, SharedModule],
})
export class UserModule implements OnInit {
  ngOnInit(): void {}
}
