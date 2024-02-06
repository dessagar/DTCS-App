import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { LoginComponent } from './authentication/login/login.component';
import { SignupComponent } from './authentication/signup/signup.component';
import { DashboardComponent } from './dashboard/dashboard.component';
import { HomeComponent } from './home/home.component';
import { ImedoneFlowComponent } from './flow/imedone-flow/imedone-flow.component';
import { PmsFlowComponent } from './flow/pms/pms-flow/pms-flow.component';
import { PmsContentComponent } from './flow/pms/pms-content/pms-content.component';
import { CareFlowComponent } from './flow/care/care-flow/care-flow.component';
import { CareContentComponent } from './flow/care/care-content/care-content.component';
import { LsmFlowComponent } from './flow/lsm/lsm-flow/lsm-flow.component';
import { LsmContentComponent } from './flow/lsm/lsm-content/lsm-content.component';
import { BillingFlowComponent } from './flow/billing/billing-flow/billing-flow.component';
import { BillingContentComponent } from './flow/billing/billing-content/billing-content.component';
import { GrmFlowComponent } from './flow/grm/grm-flow/grm-flow.component';
import { GrmContentComponent } from './flow/grm/grm-content/grm-content.component';
import { DocopFlowComponent } from './flow/docop/docop-flow/docop-flow.component';
import { DocopContentComponent } from './flow/docop/docop-content/docop-content.component';
import { AskmeComponent } from './askme/askme.component';
import { TestFlowComponent } from './flow/test/test-flow/test-flow.component';
import { AmsFlowComponent } from './flow/ams/ams-flow/ams-flow.component';
import { AmsContentComponent } from './flow/ams/ams-content/ams-content.component';
import { ChatbotComponent } from './chatbot/chatbot.component';
import { chatQuestionComponent } from './chatQuestion/chatQuestion.component';
import { Admin_dashboardComponent } from './admin_dashboard/admin_dashboard.component';
import { ClangComponent } from './clang/clang.component';
import {AdminSubjectComponent} from './admin-subject/admin-subject.component'
import { CarouselComponent } from './carousel/carousel.component';
import { AdminModuleComponent } from './admin-module/admin-module.component';
import { CreateSlideComponent } from './create-slide/create-slide.component';
import { AdminSubSectionComponent } from './admin-sub-section/admin-sub-section.component';
import { AdminSubtopicComponent } from './admin-subtopic/admin-subtopic.component';




const routes: Routes = [
  {path:'',redirectTo:'/login',pathMatch:'full'},
  // { path: '#', redirectTo: '/signup' } ,
  {path:'login',component:LoginComponent},
  {path:'signup',component:SignupComponent},
  {path:'home',component:HomeComponent},
  {path:'dashboard',component:DashboardComponent},
  {path:'imedOneFlow',component:ImedoneFlowComponent},
  {path:'pmsFlow',component:PmsFlowComponent},
  {path:'careFlow',component:CareFlowComponent},
  {path:'chatbot',component:ChatbotComponent},
  {path:'lsmFlow',component:LsmFlowComponent},
  {path:'billingFlow',component:BillingFlowComponent},
  {path:'grmFlow',component:GrmFlowComponent},
  {path:'docopFlowPage',component:DocopFlowComponent},
  {path:'pmsContent',component:PmsContentComponent},
  {path:'careContent',component:CareContentComponent},
  {path:'lsmContent',component:LsmContentComponent},
  {path:'billingContent',component:BillingContentComponent},
  {path:'grmContent',component:GrmContentComponent},
  {path:'docopContent',component:DocopContentComponent},
  {path:'askme',component:AskmeComponent},
  {path:'test',component:TestFlowComponent},
  {path:'amsFlowPage',component:AmsFlowComponent},
  {path:'chatQuestion',component:chatQuestionComponent},
  {path:'amsContentPage',component:AmsContentComponent},
  {path: 'clangpage', component:ClangComponent},
  {path:'Admin_dashboardComponent',component:Admin_dashboardComponent},
  {path: 'admin_subject',component:AdminSubjectComponent},
  {path:'carousel',component:CarouselComponent},
  {path:'adminmodule',component:AdminModuleComponent},
  {path:'createslide',component:CreateSlideComponent},
  { path: 'createslide/:_id', component: CreateSlideComponent },
  {path:'subsection',component:AdminSubSectionComponent},
  { path: 'admin_subtopic', component :AdminSubtopicComponent}


];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
