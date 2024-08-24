## Vike + Vue + Effector + SSR

This template is based on Vike + Vue + Effector.

`vike-vue` is not used to have better control over rendering mechanism.

### Hooks/Events

All standard hooks can be used, plus some extra to control effector values

Data flow:

`+data`: vike hook for initial data preparation if needed\
`+onBeforeInit`: hook, fires before page init event on server side, have access to the effector scope\
`+pageInitiated`: effector event, fires on page init on server side.\
`+onAfterInit`: hook, fires after page init event on server side, have access to the effector scope\
`appStarted`: effector event, fires on app start on client side.\
`+pageStarted`: effector event, fires on page start on client side.
