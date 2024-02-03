import { NgModule } from '@angular/core';

import { BrowserModule } from '@angular/platform-browser';
import { HttpClientModule } from '@angular/common/http';
import { ReactiveFormsModule } from '@angular/forms';
import { FormsModule } from '@angular/forms';


import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { LoginComponent } from './authentication/login/login.component';
import { SignupComponent } from './authentication/signup/signup.component';
import { HomeComponent } from './home/home.component';
import { DashboardComponent } from './dashboard/dashboard.component';
import { ImedoneFlowComponent } from './flow/imedone-flow/imedone-flow.component';
import { PmsFlowComponent } from './flow/pms/pms-flow/pms-flow.component';
import { PmsContentComponent } from './flow/pms/pms-content/pms-content.component';
import { AskmeComponent } from './askme/askme.component';
import { CareFlowComponent } from './flow/care/care-flow/care-flow.component';
import { CareContentComponent } from './flow/care/care-content/care-content.component';
import { LsmFlowComponent } from './flow/lsm/lsm-flow/lsm-flow.component';
import { ChatbotComponent } from './chatbot/chatbot.component';
import { LsmContentComponent } from './flow/lsm/lsm-content/lsm-content.component';
import { DocopFlowComponent } from './flow/docop/docop-flow/docop-flow.component';
import { DocopContentComponent } from './flow/docop/docop-content/docop-content.component';
import { BillingFlowComponent } from './flow/billing/billing-flow/billing-flow.component';
import { BillingContentComponent } from './flow/billing/billing-content/billing-content.component';
import { GrmFlowComponent } from './flow/grm/grm-flow/grm-flow.component';
import { GrmContentComponent } from './flow/grm/grm-content/grm-content.component';
import { AmsFlowComponent } from './flow/ams/ams-flow/ams-flow.component';
import { AmsContentComponent } from './flow/ams/ams-content/ams-content.component';
import { TestFlowComponent } from './flow/test/test-flow/test-flow.component';
import { chatQuestionComponent } from './chatQuestion/chatQuestion.component';
import { Admin_dashboardComponent } from './admin_dashboard/admin_dashboard.component'
import { ClangComponent } from './clang/clang.component';
import { AdminSubjectComponent } from './admin-subject/admin-subject.component';
import { CarouselComponent } from './carousel/carousel.component';
import { AdminModuleComponent } from './admin-module/admin-module.component';
import { CreateSlideComponent } from './create-slide/create-slide.component';
import { PmsContentService } from './flow/pms/pms-content/pms-content.service';



@NgModule({
  declarations: [
    AppComponent,
    LoginComponent,
    SignupComponent,
    HomeComponent,
    DashboardComponent,
    ImedoneFlowComponent,
    PmsFlowComponent,
    PmsContentComponent,
    AskmeComponent,
    ChatbotComponent,
    CareFlowComponent,
    CareContentComponent,
    LsmFlowComponent,
    LsmContentComponent,
    DocopFlowComponent,
    DocopContentComponent,
    BillingFlowComponent,
    BillingContentComponent,
    GrmFlowComponent,
    GrmContentComponent,
    AmsFlowComponent,
    AmsContentComponent,
    Admin_dashboardComponent,
    chatQuestionComponent,
    ClangComponent,
    TestFlowComponent,
    AdminSubjectComponent,
    CarouselComponent,
    AdminModuleComponent,
    CreateSlideComponent,
   
  
  ],
  imports: [
    BrowserModule,
    HttpClientModule,
    ReactiveFormsModule,
    FormsModule,
    AppRoutingModule
  ],
  providers: [PmsContentService],
  bootstrap: [AppComponent]
})
export class AppModule { }
