import { Controller } from "@hotwired/stimulus"

export default class extends Controller {
  static targets = [
      "liftTemplate",
      "setTemplate"
  ]
  connect() {
  }

  addLift() {
    let clone = document.importNode(this.liftTemplateTarget.content,true);
    let lifts = document.getElementsByClassName('workout-lift');
    let div = clone.querySelector('div')
    let liftSetsDiv = div.querySelector('#NEW_RECORD-lift-sets')

    liftSetsDiv.setAttribute('id', `${lifts.length}-lift-sets`)
    let buttons = div.querySelectorAll('.button')

    for(let i=0; i<buttons.length; i++) {
      console.log(buttons[i].value)
      buttons[i].setAttribute('value', lifts.length)
      console.log(buttons[i].value)
    }

    for(let i=0; i<div.querySelectorAll('input').length; i++) {
      let input = div.querySelectorAll('input')[i]
      input.setAttribute('name', input.name.replace('NEW_RECORD', lifts.length));
    }
    document.getElementById('lifts').appendChild(div);
  }

  addSet(e) {
    this.appendSet(e, 'normal')
  }

  addSuperSet(e) {
    this.appendSet(e, 'super set')
  }

  appendSet(e, style) {
    console.log(e.target.value)
    let liftSetsDiv = document.getElementById(`${e.target.value}-lift-sets`)
    let clone = document.importNode(this.setTemplateTarget.content,true)
    let div = clone.querySelector('div')
    let sets = liftSetsDiv.getElementsByClassName(`lift-set`)
    let inputs = div.querySelectorAll('input')

    for(let i=0; i<inputs.length; i++) {
      let input = inputs[i]
      let value = '';
      if (sets.length > 0) {
        value = sets[sets.length - 1].lastElementChild.querySelector('input').value
      }
      input.setAttribute('name', input.name.replace('NEW_RECORD', sets.length))
      input.classList.remove('reps-normal')
      input.classList.remove('reps-super-set')
      if (input.name.includes('weight')) {
        input.setAttribute('value', value)
        input.classList.add(`reps-${style.replace(' ', '-')}`)
      } else if ( input.name.includes('style') ) {
        input.setAttribute('value', style)
      } else if ( input.name.includes('reps') ) {
        input.setAttribute('value', '')
        input.classList.add(`reps-${style.replace(' ', '-')}`)
      } else if ( input.name.includes('[id]') ) {
        input.value = ''
      }
    }
    liftSetsDiv.appendChild(div);
  }
}
