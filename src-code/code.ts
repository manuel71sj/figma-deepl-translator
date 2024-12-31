import { getStore, setStore, listenTS, dispatchTS } from "./utils/code-utils";
import type { Extract } from "../src/globals";

figma.showUI(__html__, {
  themeColors: true,
  width: 550,
  height: 600,
});

const authKey: string = "020c8af8-a8d4-a8bf-0370-7c797dec4da6:fx"; // Replace with your key
const API_HOST: string = "https://deepl-wrapper.hashcode.click/api/translate/";

listenTS("saveAuthKey", (res) => {
  console.log("authKey", res);
  setStore("authKey", res.authKey);
});

listenTS("getAuthKey", async () => {
  const authKey = await getStore("authKey");
  dispatchTS("getAuthKeyCallback", { authKey });
});

listenTS("extract", async (res) => {
  console.log("extract", res);

  const selection = figma.currentPage.selection;
  const texts: Extract[] = [];

  if (Array.isArray(selection) && selection.length > 0) {
    for (const nodes of selection) {
      if (nodes.type === "TEXT") {
        texts.push({
          frame: nodes.name,
          name: nodes.name,
          text: nodes.characters,
        });
      } else {
        texts.push(
          ...(nodes.findAll((node) => node.type === "TEXT") as TextNode[]).map((node) => ({
            frame: nodes.name,
            name: node.name,
            text: node.characters,
          }))
        );
      }
    }
  }

  dispatchTS("extractCallback", { result: texts });
});

listenTS("hello", async (res) => {
  console.log("code.ts");

  const result = await fetchTranslation("Hello, World", "KO");

  console.log("trans", result);
  showErrorMessage(result);

  alert(`Hello ${res.string}`);
  dispatchTS("helloCallback", { result: true });
});

const fetchTranslation = async (text: string, target: string = "KO"): Promise<string | undefined> => {
  try {
    const body = {
      api_key: authKey,
      text: text,
      source_lang: "EN",
      target_lang: target,
    };

    const response = await fetch(API_HOST, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(body),
    });

    if (response.ok === true) {
      const result = await response.json();
      return result.result.text;
    } else {
      throw new Error(`${response.status} ${response.statusText}`);
    }
  } catch (error) {
    console.error("error", error);
    showErrorMessage(`API 요청에 문제가 있습니다.\n(${error})`);
  }
};

const showErrorMessage = (message: string) => {
  figma.notify(message, { error: true });
};
