<script setup lang="ts">
import { ref, reactive, onMounted } from "vue";
import { dispatchTS, getColorTheme, listenTS, subscribeColorTheme } from "./utils/utils";
import type { Extract } from "./globals";

// import boltIconLight from "./assets/bolt-figma-lightmode.svg";
// import boltIconDark from "./assets/bolt-figma-darkmode.svg";
// import viteIcon from "./assets/vite.svg";
// import vueIcon from "./assets/vue.svg";
// import typescriptIcon from "./assets/typescript.svg";
// import sassIcon from "./assets/sass.svg";

const sourceLanguage = [
  {
    language: "BG",
    name: "Bulgarian",
  },
  {
    language: "CS",
    name: "Czech",
  },
  {
    language: "DA",
    name: "Danish",
  },
  {
    language: "DE",
    name: "German",
  },
  {
    language: "EL",
    name: "Greek",
  },
  {
    language: "EN",
    name: "English",
  },
  {
    language: "ES",
    name: "Spanish",
  },
  {
    language: "ET",
    name: "Estonian",
  },
  {
    language: "FI",
    name: "Finnish",
  },
  {
    language: "FR",
    name: "French",
  },
  {
    language: "HU",
    name: "Hungarian",
  },
  {
    language: "ID",
    name: "Indonesian",
  },
  {
    language: "IT",
    name: "Italian",
  },
  {
    language: "JA",
    name: "Japanese",
  },
  {
    language: "KO",
    name: "Korean",
  },
  {
    language: "LT",
    name: "Lithuanian",
  },
  {
    language: "LV",
    name: "Latvian",
  },
  {
    language: "NB",
    name: "Norwegian",
  },
  {
    language: "NL",
    name: "Dutch",
  },
  {
    language: "PL",
    name: "Polish",
  },
  {
    language: "PT",
    name: "Portuguese",
  },
  {
    language: "RO",
    name: "Romanian",
  },
  {
    language: "RU",
    name: "Russian",
  },
  {
    language: "SK",
    name: "Slovak",
  },
  {
    language: "SL",
    name: "Slovenian",
  },
  {
    language: "SV",
    name: "Swedish",
  },
  {
    language: "TR",
    name: "Turkish",
  },
  {
    language: "UK",
    name: "Ukrainian",
  },
  {
    language: "ZH",
    name: "Chinese",
  },
];

const targetLanguage = [
  {
    language: "BG",
    name: "Bulgarian",
    supports_formality: false,
  },
  {
    language: "CS",
    name: "Czech",
    supports_formality: false,
  },
  {
    language: "DA",
    name: "Danish",
    supports_formality: false,
  },
  {
    language: "DE",
    name: "German",
    supports_formality: true,
  },
  {
    language: "EL",
    name: "Greek",
    supports_formality: false,
  },
  {
    language: "EN-GB",
    name: "English (British)",
    supports_formality: false,
  },
  {
    language: "EN-US",
    name: "English (American)",
    supports_formality: false,
  },
  {
    language: "ES",
    name: "Spanish",
    supports_formality: true,
  },
  {
    language: "ET",
    name: "Estonian",
    supports_formality: false,
  },
  {
    language: "FI",
    name: "Finnish",
    supports_formality: false,
  },
  {
    language: "FR",
    name: "French",
    supports_formality: true,
  },
  {
    language: "HU",
    name: "Hungarian",
    supports_formality: false,
  },
  {
    language: "ID",
    name: "Indonesian",
    supports_formality: false,
  },
  {
    language: "IT",
    name: "Italian",
    supports_formality: true,
  },
  {
    language: "JA",
    name: "Japanese",
    supports_formality: true,
  },
  {
    language: "KO",
    name: "Korean",
    supports_formality: false,
  },
  {
    language: "LT",
    name: "Lithuanian",
    supports_formality: false,
  },
  {
    language: "LV",
    name: "Latvian",
    supports_formality: false,
  },
  {
    language: "NB",
    name: "Norwegian",
    supports_formality: false,
  },
  {
    language: "NL",
    name: "Dutch",
    supports_formality: true,
  },
  {
    language: "PL",
    name: "Polish",
    supports_formality: true,
  },
  {
    language: "PT-BR",
    name: "Portuguese (Brazilian)",
    supports_formality: true,
  },
  {
    language: "PT-PT",
    name: "Portuguese (European)",
    supports_formality: true,
  },
  {
    language: "RO",
    name: "Romanian",
    supports_formality: false,
  },
  {
    language: "RU",
    name: "Russian",
    supports_formality: true,
  },
  {
    language: "SK",
    name: "Slovak",
    supports_formality: false,
  },
  {
    language: "SL",
    name: "Slovenian",
    supports_formality: false,
  },
  {
    language: "SV",
    name: "Swedish",
    supports_formality: false,
  },
  {
    language: "TR",
    name: "Turkish",
    supports_formality: false,
  },
  {
    language: "UK",
    name: "Ukrainian",
    supports_formality: false,
  },
  {
    language: "ZH",
    name: "Chinese (simplified)",
    supports_formality: false,
  },
  {
    language: "ZH-HANS",
    name: "Chinese (simplified)",
    supports_formality: false,
  },
];

let count = ref(0);

const helloWorld = () => {
  dispatchTS("hello", {
    string: "World",
    num: 20,
  });

  listenTS(
    "helloCallback",
    (res) => {
      console.log("helloCallback result: ", res);
    },
    true
  );
};

let lightOrDarkMode = ref(getColorTheme());
onMounted(() => {
  subscribeColorTheme((mode) => {
    // lightOrDarkMode.value = mode;
    lightOrDarkMode.value = "light";
  });

  getAuthKey();
});

// deepl api authkey
const authKey = ref<string>("");

const saveAuthKey = () => {
  console.log("saveAuthKey: ", authKey.value);

  dispatchTS("saveAuthKey", {
    authKey: authKey.value,
  });
};

const getAuthKey = () => {
  dispatchTS("getAuthKey", {});

  listenTS("getAuthKeyCallback", (res) => {
    console.log("getAuthKeyCallback result: ", res);
    authKey.value = res.authKey;
  });
};

// 언어 선택
const sourceLang = ref<string>("KO");
const targetLang = ref<string>("JA");

// 추출
const extractedLayers: Extract[] = reactive([]);

const extract = () => {
  saveAuthKey();

  dispatchTS("extract", {});

  listenTS("extractCallback", async (res: Extract[]) => {
    console.log("extractCallback result: ", res);
    extractedLayers.splice(0, extractedLayers.length);
    extractedLayers.push(...res.result);

    if (authKey.value === "") {
      return;
    }

    for (const el of extractedLayers) {
      const aaa = await fetchTranslation(el.text);
      console.log("aaa", aaa);
      el.translate = aaa;
    }
  });
};

// 번역
const fetchTranslation = async (text: string): Promise<string | undefined> => {
  const API_HOST: string = "https://deepl-wrapper.hashcode.click/api/translate/";

  if (authKey.value === "") {
    console.error("authKey is empty");
    return "";
  }

  try {
    const body = {
      api_key: authKey.value,
      text: text,
      source_lang: sourceLang.value,
      target_lang: targetLang.value,
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
</script>

<template>
  <div class="body">
    <div class="api">
      <div class="title">
        <div class="deepl-api-auth">DeepL API Auth Key</div>
        <div class="link-button">
          <img
            class="vector-icon"
            alt=""
            src="./assets/ico_link.svg" />
            <a class="div"
          href="https://www.deepl.com/your-account/keys"
          target="_blank">
          여기에서 발급가능</a>
        </div>
      </div>
      <div class="input-api">
        <input
          class="input"
          v-model="authKey"
          style="flex: 1 1 0%"
          placeholder="Deepl API Auth Key" />
        <!-- <div class="input">
            <div class="api-key">API Key를 입력해주세요.</div>
          </div> -->
        <button
          class="button"
          @click="saveAuthKey">
          저장
        </button>
        <!-- <div class="button">
            <div class="div1">저장</div>
          </div>-->
      </div>
      <span style="margin-left: 5px;">API 키가 공란인 경우 추출만 가능합니다.</span>
    </div>
    <div class="translation-area">
      <div class="conversion">
        <select
          v-model="sourceLang"
          class="dropdown-original">
          <option
            v-for="lang in sourceLanguage"
            :key="lang.language"
            :value="lang.language">
            {{ lang.name }}
          </option>
        </select>
        <img
          class="ico-translation-icon"
          alt=""
          src="./assets/ico_translation.svg" />
        <select
          v-model="targetLang"
          class="dropdown-original">
          <option
            v-for="lang in targetLanguage"
            :key="lang.language"
            :value="lang.language">
            {{ lang.name }}
          </option>
        </select>
        <button
          class="button1"
          @click="extract">
          추출 및 번역
        </button>
        <!-- <div class="button1">
            <div class="deepl-api-auth">추출 및 번역</div>
          </div> -->
      </div>
      <table class="table-area">
        <thead class="thead">
          <th class="th">
            <td class="deepl-api-auth">
              프레임
            </td>
          </th>
          <th class="th">
            <td class="deepl-api-auth">
              레이어명
            </td>
          </th>
          <th class="th">
            <td class="deepl-api-auth">
              텍스트
            </td>
          </th>
          <th class="th">
            <td class="deepl-api-auth">
              번역
            </td>
          </th>
        </thead>
        <tbody class="tbody">
          <tr
            v-for="layer in extractedLayers"
            :key="layer.id"
            class="tr">
            <td class="td">
              <div class="text">{{ layer.frame }}</div>
            </td>
            <td class="td">
              <div class="text">{{ layer.name }}</div>
            </td>
            <td class="td">
              <div class="text">{{ layer.text }}</div>
            </td>
            <td class="td">
              <div class="text">{{ layer.translate }}</div>
            </td>
          </tr>
        </tbody>
      </table>
    </div>
  </div>
</template>

<style lang="scss"></style>
