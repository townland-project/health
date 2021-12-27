import { Component, ComponentHelper, ComponentOnInit, RenderComponent } from '@townland-project/dom'
import { IHealthItem } from '../../core/item'
import { Event } from '../../core/eventer'
import { ItemComponent } from '../item'

@Component({
    id: 'tl-items',
    template: '',
    style: require('./component.scssx')
})
export class ItemsComponent extends ComponentHelper implements ComponentOnInit {

    ComponentOnInit(): void {
        Event.on('item:change', (id: string, value: number, max: number) => this.SetItemValue(id, value, max))
        Event.on('item:add', (item: IHealthItem) => this.AddItem(item))
        Event.on('item:set', (items: IHealthItem[]) => items.forEach((item) => this.AddItem(item)))
    }

    GetItemPercent(value: number, max: number): number {
        return Math.floor((100 * value) / max)
    }

    SetItemValue(id: string, value: number, max: number): void {
        let element: HTMLDivElement = document.querySelector(`tl-item[item-id="${id}"]`)!

        element.style.setProperty('--max', `"${max}"`)
        element.style.setProperty('--value', `"${value}"`)
        element.style.setProperty('--percent', `${this.GetItemPercent(value, max)}%`)
    }

    AddItem(item: IHealthItem): void {
        RenderComponent(ItemComponent, {
            Values: {
                item: item
            }
        }).then(element => {
            element.setAttribute('item-id', item.id)
            element.style.setProperty('--color', item.color)
            element.style.setProperty('--max', `"${item.max}"`)
            element.style.setProperty('--value', `"${item.value}"`)
            element.style.setProperty('--percent', `${this.GetItemPercent(item.value, item.max)}%`)

            this.Element.appendChild(element)
        })
    }
}
