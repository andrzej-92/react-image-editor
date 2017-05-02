import imageEditorSagas from '../modules/image-editor/sagas'

export function * sagas() {

  let all:any = [];

  all = all.concat(imageEditorSagas);

  yield all;
}
