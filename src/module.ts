import { Module } from '@townland-project/dom'
import { HeaderComponent } from './components/header'
import { ItemsComponent } from './components/items'
import { MainComponent } from './components/main'

@Module({
    Component: [
        HeaderComponent,
        ItemsComponent
    ],
    Bootstrap: MainComponent
})
export class AppModule { }