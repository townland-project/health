import { Component, ComponentHelper, RenderOnInit } from '@townland-project/dom'
import { Caches } from '@townland-project/cache'
import { GenerateCharacter } from '@townland-project/character-dom/src/index'

@Component({
    id: 'tl-header',
    template: require('./component.htmlx'),
    style: require('./component.scssx')
})
export class HeaderComponent extends ComponentHelper implements RenderOnInit {
    RenderOnInit(): void {
        Caches.Character.OnOpen(() => {
            this.CharacterInit()
        })
    }

    async CharacterInit() {
        let res = await Caches.Character.GetJson('https://cdn.townland.xyz/character.json')
        let assets = await res?.json()
        let first_character = await GenerateCharacter({
            username: '',
            dna: '',
            access: 'root',
            gender: 'male',
            dress: {
                body: 'white-male-body',
                hair: 'long-black-hair',
                eyes: 'male-blue-eyes',
                mouth: 'male-smile',
                tops: 'blue-graphic-t',
                bottoms: 'dark-skinny-jean',
                shoes: 'white-sneakers',
            },
        }, assets.item)
        let second_character = await GenerateCharacter({
            username: '',
            dna: '',
            access: 'root',
            gender: 'female',
            dress: {
                body: 'white-female-body',
                hair: 'red-long',
                eyes: 'brown-female-eyes',
                mouth: 'female-grin',
                tops: 'gold-buttonup',
                bottoms: 'black-dress-skirt',
                shoes: 'red-heels',
            },
        }, assets.item)

        first_character.setAttribute('index', '1')
        second_character.setAttribute('index', '2')

        let element = document.querySelector('tl-header div.characters')!

        element.appendChild(first_character)
        element.appendChild(second_character)
    }
}
