
import QuestionPane from "./components/QuestionPane";

export default class PracticeScreen {
  constructor() {
    if (sessionStorage.auth) {
      
    } else {
      location.href = "/";
    }
  }
}
