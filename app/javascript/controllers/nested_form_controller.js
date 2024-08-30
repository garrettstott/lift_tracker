import { Controller } from "@hotwired/stimulus"

export default class extends Controller {
  static targets = [
      "liftTemplate",
      "setTemplate"
  ]
  connect() {
  }

  addLift() {
    // GET TEMPLATE
    let clone = document.importNode(this.liftTemplateTarget.content,true);
    // GET CONTENT IN TEMPLATE
    let div = clone.querySelector('div')
    // GET ALL THE LIFTS
    let lifts = document.getElementsByClassName('workout-lift');
    // GET ALL LIFT SETS IN CONTENT
    let liftSetsDiv = div.querySelector('#NEW_RECORD-lift-sets')
    // SET INDEX
    let index = lifts.length;
    // SET NEW ID
    liftSetsDiv.setAttribute('id', `${index}-lift-sets`)
    // GET THE ADD REPS BUTTONS
    let buttons = div.querySelectorAll('.button')

    // SET VALUE FOR BUTTONS - ONCLICK
    for(let i=0; i<buttons.length; i++) {
      buttons[i].setAttribute('value', index)
    }

    // SET NEW ATTRIBUTES FOR INPUTS
    for(let i=0; i<div.querySelectorAll('input').length; i++) {
      let input = div.querySelectorAll('input')[i]
      input.setAttribute('name', input.name.replace('NEW_RECORD', index))
      input.setAttribute('id', input.id.replace('NEW_RECORD', index))
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
    // SET LIFT ID
    let liftId = e.target.value;
    // GET THE TEMPLATE
    let clone = document.importNode(this.setTemplateTarget.content,true)
    // GET CONTENT
    let div = clone.querySelector('div')
    // GET CURRENT LIFT SET DIV
    let liftSetsDiv = document.getElementById(`${liftId}-lift-sets`)
    // GET CURRENT SETS
    let sets = liftSetsDiv.getElementsByClassName(`lift-set`)
    // SET INDEX
    let index = sets.length
    // GET INPUTS
    let inputs = div.querySelectorAll('input')

    for(let i=0; i<inputs.length; i++) {
      let input = inputs[i]
      let value = '';
      if (index > 0) {
        value = sets[index - 1].lastElementChild.querySelector('input').value
      }

      // SET WORKOUT LIFTS INDEX
      input.setAttribute('name', input.name.replace('[workout_lifts_attributes][NEW_RECORD]', `[workout_lifts_attributes][${liftId}]`))
      input.setAttribute('id', input.name.replace('workout_lifts_attributes_NEW_RECORD', `workout_lifts_attributes_${liftId}`))
      // SET CURRENT INDEX OF SET
      input.setAttribute('name', input.name.replace('NEW_RECORD', `${index}`))
      input.setAttribute('id', input.id.replace('NEW_RECORD', `${index}`))
      input.classList.remove('reps-normal')
      input.classList.remove('reps-super-set')
      // SET VALUES BASED ON INPUT
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
