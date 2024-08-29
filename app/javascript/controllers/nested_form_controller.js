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
    let clone = document.importNode(this.setTemplateTarget.content,true)
    let div = clone.querySelector('div')
    let liftsDiv = document.getElementById(`${e.target.value}-lift-sets`)
    let sets = liftsDiv.getElementsByClassName(`lift-set`)
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
    liftsDiv.appendChild(div);
  }
}
