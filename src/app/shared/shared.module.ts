import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms'; 
import { MatInputModule } from '@angular/material/input';
import { MatRadioModule } from '@angular/material/radio';
import { NgxEditorModule } from 'ngx-editor';
import { MatButtonModule } from '@angular/material/button';
import { HttpClientModule } from '@angular/common/http';
import { MatIconModule } from '@angular/material/icon';
import { MatTableModule } from '@angular/material/table';
import { AddSpacesPipe } from './pipes/add-space';
import { MatDialogModule } from '@angular/material/dialog';
import { MatChipsModule } from '@angular/material/chips';
import { MatSelectModule } from '@angular/material/select';
import { MatSnackBarModule } from '@angular/material/snack-bar';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatListModule } from '@angular/material/list';
import { CommonModule } from '@angular/common';
import { PostPreviewComponent } from './components/post-preview/post-preview.component';
import { MatExpansionModule } from '@angular/material/expansion';
import { LoadingSpinnerComponent } from './components/loading-spinner/loading-spinner.component';
import {MatProgressSpinnerModule} from '@angular/material/progress-spinner';
import { PlayerNamePipe } from './pipes/player-name'; 
import { SidePostComponent } from './components/side-post/side-post.component';
import { RichTextToStringPipe } from './pipes/rich-text-to-string';
import {MatTabsModule} from '@angular/material/tabs';
import { ReadingTimePipe } from './pipes/reading-time';
import {MatProgressBarModule} from '@angular/material/progress-bar';
import {MatSlideToggleModule} from '@angular/material/slide-toggle';
import { FooterInfoDialog } from './dialogs/footer-info-dialog/footer-info-dialog.component';
import { NgApexchartsModule } from 'ng-apexcharts';
import { AngularFireModule } from '@angular/fire/compat';
import { AngularFireDatabaseModule } from '@angular/fire/compat/database';
import { AngularFirestoreModule } from '@angular/fire/compat/firestore';
import { AngularFireStorageModule } from '@angular/fire/compat/storage';
import { environment } from 'src/environments/environment'; 
import { LiveMatchStatusPipe } from './pipes/live-match-status';

@NgModule({
  declarations: [AddSpacesPipe, PostPreviewComponent, LoadingSpinnerComponent,PlayerNamePipe,ReadingTimePipe,SidePostComponent,RichTextToStringPipe,FooterInfoDialog,LiveMatchStatusPipe],
  imports: [NgApexchartsModule,
    CommonModule,
    ReactiveFormsModule,
    MatInputModule,
    MatRadioModule,
    FormsModule,
    NgxEditorModule,
    MatButtonModule,
    HttpClientModule,
    MatButtonModule,
    MatIconModule,
    MatTableModule,
    MatDialogModule,
    MatChipsModule,
    MatSelectModule,
    MatSnackBarModule,
    MatToolbarModule,
    MatListModule,
    MatExpansionModule,
    MatProgressSpinnerModule,
    MatTabsModule,
    MatProgressBarModule,
    MatSlideToggleModule,
    AngularFireModule.initializeApp(environment),
    AngularFireDatabaseModule,
    AngularFirestoreModule,
    AngularFireStorageModule
  ],
  exports: [
    NgApexchartsModule,
    ReactiveFormsModule,
    MatInputModule,
    MatRadioModule,
    FormsModule,
    NgxEditorModule,
    MatButtonModule,
    HttpClientModule,
    MatButtonModule,
    MatIconModule,
    MatTableModule,
    AddSpacesPipe,
    MatDialogModule,
    MatChipsModule,
    MatSelectModule,
    MatToolbarModule,
    PostPreviewComponent,
    MatListModule,
    MatExpansionModule,
    LoadingSpinnerComponent,
    MatProgressSpinnerModule,
    PlayerNamePipe,
    ReadingTimePipe,
    SidePostComponent,
    RichTextToStringPipe,
    MatTabsModule, 
    MatProgressBarModule,
    MatSlideToggleModule,
    FooterInfoDialog,
    AngularFireModule,
    AngularFireDatabaseModule,
    AngularFirestoreModule,
    AngularFireStorageModule,
    LiveMatchStatusPipe
  ],
  providers: [],
})
export class SharedModule {}
