import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {FrameRoutingModule} from './frame.routing.module';
import {FrameComponent} from './frame.component';
import {BannerComponent} from './bannner/banner.component';
import {ArticleListComponent} from './article-list/article-list.component';
import {NgbModule} from '@ng-bootstrap/ng-bootstrap';
import {FooterComponent} from './footer/footer.component';


@NgModule({
  imports: [
    CommonModule,
    FrameRoutingModule,
    NgbModule,
  ],
  declarations: [
    FrameComponent,
    BannerComponent,
    ArticleListComponent,
    FooterComponent,
  ],
  exports: [
    FooterComponent
  ]
})
export class FrameModule {
}
