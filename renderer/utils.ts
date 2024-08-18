// Same as Object.assign() but with type inference
export const objectAssign = <Obj extends object, ObjAddendum>(
  obj: Obj,
  objAddendum: ObjAddendum
): asserts obj is Obj & ObjAddendum => {
  Object.assign(obj, objAddendum)
}
