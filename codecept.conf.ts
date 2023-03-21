import { setHeadlessWhen, setCommonPlugins } from '@codeceptjs/configure';
// turn on headless mode when running with HEADLESS=true environment variable
// export HEADLESS=true && npx codeceptjs run
setHeadlessWhen(process.env.HEADLESS);

// enable all common plugins https://github.com/codeceptjs/configure#setcommonplugins
setCommonPlugins();

export const config: CodeceptJS.MainConfig = {
  tests: '',
  output: './output',
  gherkin: {
    features: "./features/*.feature",
    steps: [
      "./step_definitions/steps.ts"
    ]
  },
  helpers: {
    WebDriver: {
      url: 'https://www.aviasales.ru',
      browser: 'chrome',
      smartWait: 10000,
      desiredCapabilities: {
        chromeOptions: {
          args: ["--disable-gpu", "--no-sandbox", "--disable-blink-features=AutomationControlled"],
          // prefs: {
          //   'intl.accept_languages': 'en,EN'
          // }
        }
      },
      
      windowSize: "maximize"
    }
  },
  plugins: {
      wdio: {
      enabled: true,
      services: ['selenium-standalone']
    }
  },
  include: {
    I: './steps_file'
  },
  name: 'codeceptjs'
}