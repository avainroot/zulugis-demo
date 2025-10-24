import { Map } from "@components";
import { Theme } from "@radix-ui/themes";

function App() {
  return (
    <Theme id="theme" appearance="light" accentColor="blue">
      <Map.Container />
    </Theme>
  );
}

export default App;
