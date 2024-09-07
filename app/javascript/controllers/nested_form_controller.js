import { Controller } from "@hotwired/stimulus"

export default class extends Controller {
  static targets = [
      "liftTemplate",
      "setTemplate"
  ]
  connect() {
  }

  removeLift(e) {
    let index = e.target.dataset.index
    let workoutLift = document.getElementById(`${index}-workout-lift`)
    let input = workoutLift.querySelector(`input[name='workout[workout_lifts_attributes][${index}][id]']`);
    if ( input && input.value ) {
      workoutLift.classList.add('hidden')
      let destroy = document.createElement('input')
      destroy.setAttribute('name', `workout[workout_lifts_attributes][${index}][_destroy]`)
      destroy.setAttribute('value', '1')
      workoutLift.appendChild(destroy)
    } else {
      workoutLift.remove()
    }
  }

  removeSet(e) {
    let liftIndex = e.target.dataset.index
    console.log(liftIndex)
    let liftSetsContainer = document.getElementById(`${liftIndex}-lift-sets`)
    console.log(liftSetsContainer)
    let liftSets = liftSetsContainer.querySelectorAll(('.lift-set'))
    console.log(liftSets)
    let lastLift = liftSets[liftSets.length - 1]
    console.log(lastLift)
    let input = lastLift.querySelector(`input[name='workout[workout_lifts_attributes][${liftIndex}][lift_sets_attributes][${liftSets.length - 1}][id]']`);
    console.log(input)
    let removeLink = document.getElementById(`remove-set-${liftIndex}`)
    console.log(removeLink)
    if ( input && input.value ) {
      lastLift.classList.add('hidden')
      let destroy = document.createElement('input')
      destroy.setAttribute('name', `workout[workout_lifts_attributes][${liftIndex}][lift_sets_attributes][${liftSets.length - 1}][_destroy]`)
      destroy.setAttribute('value', '1')
      lastLift.appendChild(destroy)
    } else {
      lastLift.remove()
    }
  }

  addLift() {
    // GET TEMPLATE
    let clone = document.importNode(this.liftTemplateTarget.content,true);
    // GET CONTENT IN TEMPLATE
    let div = clone.querySelector('div')
    // GET ALL LIFT SETS IN CONTENT
    let liftSetsDiv = div.querySelector('#NEW_RECORD-lift-sets')
    // GET REMOVE LINK
    let removeLift = div.querySelector('#remove-lift')
    // SET INDEX
    let index;
    let times = 100;
    for (let a=0; a<times;a++) {
      let input = document.getElementById(`workout_workout_lifts_attributes_${a}_id`)
      if ( !input ) {
        index = a
        break
      }
    }
    // SET WORKOUT LIFT ID
    div.setAttribute('id', div.id.replace('NEW_RECORD', index))
    // SET NEW ID
    liftSetsDiv.setAttribute('id', `${index}-lift-sets`)
    // SET REMOVE LINK INDEX
    removeLift.setAttribute('data-index', index)
    // GET THE ADD REPS BUTTONS
    let buttons = div.querySelectorAll('.button')

    // SET VALUE FOR BUTTONS - ONCLICK
    for(let i=0; i<buttons.length; i++) {
      let button = buttons[i]
      button.setAttribute('value', index)
      if ( button.id.includes('remove-set') ) {
        button.setAttribute('id', `remove-set-${index}`)
        button.setAttribute('data-index', index)
      }
    }

    // SET NEW ATTRIBUTES FOR SELECTS
    let selects = div.querySelectorAll('select')
    for(let i=0; i<selects.length; i++) {
      let select = selects[i]
      select.setAttribute('name', select.name.replace('NEW_RECORD', index))
      select.setAttribute('id', select.id.replace('NEW_RECORD', index))
      select.setAttribute('data-index', index)
      let options = select.querySelectorAll('option')
      for (let i=0;i<options.length;i++) {
        let option = options[i]
        option.removeAttribute('selected')
      }
      let option = document.createElement('option');
      option.value = ''
      option.innerHTML = 'Select Lift'
      option.selected = true
      select.prepend(option)
    }

    // SET NEW ATTRIBUTES FOR INPUTS
    let inputs = div.querySelectorAll('input')
    for(let i=0; i<inputs.length; i++) {
      let input = inputs[i]
      input.setAttribute('name', input.name.replace('NEW_RECORD', index))
      input.setAttribute('id', input.id.replace('NEW_RECORD', index))
      input.setAttribute('value', '')
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

    let removeLink = document.getElementById(`remove-set-${liftId}`)

    if ( removeLink ) {
      removeLink.classList.remove('hidden')
    }

    let weightInput;
    let repInput;

    for(let i=0; i<inputs.length; i++) {
      let input = inputs[i]
      let value = '';
      if (index > 0) {
        let setInputs = sets[index - 1].querySelectorAll('input')
        for(let i=0; i<setInputs.length; i++) {
          let setInput = setInputs[i]
          if ( setInput.name.includes('weight') ) {
            value = setInput.value
          }
        }
      }

      // SET WORKOUT LIFTS INDEX
      input.setAttribute('name', input.name.replace('[workout_lifts_attributes][NEW_RECORD]', `[workout_lifts_attributes][${liftId}]`))
      input.setAttribute('id', input.id.replace('workout_lifts_attributes_NEW_RECORD', `workout_lifts_attributes_${liftId}`))
      input.setAttribute('name', input.name.replace('[workout_lifts_attributes][0]', `[workout_lifts_attributes][${liftId}]`))
      input.setAttribute('id', input.id.replace('workout_lifts_attributes_0', `workout_lifts_attributes_${liftId}`))
      // SET CURRENT INDEX OF SET
      input.setAttribute('name', input.name.replace('NEW_RECORD', `${index}`))
      input.setAttribute('id', input.id.replace('NEW_RECORD', `${index}`))
      input.classList.remove('reps-normal')
      input.classList.remove('reps-super-set')
      // SET VALUES BASED ON INPUT
      if (input.name.includes('weight')) {
        weightInput = input;
        input.setAttribute('value', value)
        input.classList.add(`reps-${style.replace(' ', '-')}`)
      } else if ( input.name.includes('style') ) {
        input.setAttribute('value', style)
      } else if ( input.name.includes('reps') ) {
        input.setAttribute('value', '')
        input.classList.add(`reps-${style.replace(' ', '-')}`)
        repInput = input;
      } else if ( input.name.includes('[id]') ) {
        input.value = ''
      }
    }

    liftSetsDiv.appendChild(div)

    if ( index === 0 ) {
      weightInput.focus()
    } else {
      repInput.focus()
    }
  }

  changeLift(e) {
    let workoutLift = document.getElementById(`${e.target.dataset.index}-workout-lift`)
    workoutLift.querySelector('.last-lift').remove()
  }
}
