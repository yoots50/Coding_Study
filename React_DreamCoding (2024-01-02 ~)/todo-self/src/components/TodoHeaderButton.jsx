import def from "ajv/dist/vocabularies/applicator/additionalItems";
import styles from "./TodoHeaderButton.module.css";

export default function TodoHeaderButton({
  isDark: isDark,
  handler: handler,
  text: text,
  type: type,
}) {
var buttonStyle;
switch (type) {
    case "btn": 
        buttonStyle = styles.button
        break
    case "dark": 
        buttonStyle = styles.darkbutton
        break
    default :
        console.log(`unknown button type: ${type}`)
        break
}
  return (
    <button
      className={buttonStyle}
      style={{
        backgroundColor: isDark ? "#a0a0a0" : "#ffffff",
      }}
      onClick={handler}
    >
      {text}
    </button>
  );
}
