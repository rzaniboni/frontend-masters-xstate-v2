import './style.css';
import { createMachine, interpret, assign } from 'xstate';

const machine = createMachine({
  initial: 'loading',
  context: {
    name: 'David',
    count: 42
  },
  states: {
    loading: {
      on: {
        SUCCESS: {
          target: 'loaded',
          actions: [
            assign({ count: (context, event) => context.count + event.value }),
          ]
        }
      }
    },
    loaded: {}
  }
})

console.log(machine.initialState)

const nextState = machine.transition(machine.initialState, { type: 'SUCCESS'})

console.log(nextState.matches('loaded'))


const service = interpret(machine).start()

service.subscribe(state => {
  console.log(state.value, state.context)
})

window.service = service;

service.send({ type: 'SUCCESS', value: 10} )
service.send({ type: 'SUCCESS', value: 10} )