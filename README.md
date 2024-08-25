## Vike + Vue + Effector + SSR

This template is based on Vike + Vue + Effector.

`vike-vue` is not used to have better control over rendering mechanism.

### Hooks/Events

All standard hooks can be used, plus some extra to control effector values

Data flow:

`+data.ts`: vike hook for initial data preparation if needed\
`+onBeforeInit.ts`: hook, fires before page init event on server side, give access to the effector scope\
`+pageInitiated.ts`: effector event, fires on page init on server side.\
`+onAfterInit.ts`: hook, fires after page init event on server side, give access to the effector scope\
`appStarted`: effector event, fires on app start on client side.\
`+pageStarted.ts`: effector event, fires on page start on client side.

Page Components:

`+Layout.vue`: custom layout component to override the global one\
`+Wrapper.vue`: additional page wrapper
