# Welcome to swifty-companion 👋

This project is a [React Native](https://reactnative.dev/) application built with [Expo](https://expo.dev) that retrieves and displays information about students enrolled in the 42 School program using the [42 API](https://api.intra.42.fr/apidoc). The 42 API provides a comprehensive set of endpoints to access data on students, including their profiles, achievements, and progress.

![](https://github.com/zjamali/swifty-companion/blob/master/record/Simulator%20Screen%20Recording%20-%20iPhone%2015.gif)

## Get started

1. Set 42 enviroment

   ```.env
   #.env

   EXPO_PUBLIC_API_URL=https://api.intra.42.fr/
   EXPO_PUBLIC_API_CLIENT=8f31a6c907677ba8fc1e1c61aa88023279115a8d48cee399ecb968e5bca7e98f
   EXPO_PUBLIC_API_SECRET=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
   EXPO_PUBLIC_REDIRECT_URL=exp://10.30.249.17:8081
   ```

2. Install dependencies

   ```bash
   npm install
   ```

3. Start the app

   ```bash
    npx expo start
   ```

In the output, you'll find options to open the app in a

- [development build](https://docs.expo.dev/develop/development-builds/introduction/)
- [Android emulator](https://docs.expo.dev/workflow/android-studio-emulator/)
- [iOS simulator](https://docs.expo.dev/workflow/ios-simulator/)
- [Expo Go](https://expo.dev/go), a limited sandbox for trying out app development with Expo

You can start developing by editing the files inside the **app** directory. This project uses [file-based routing](https://docs.expo.dev/router/introduction).

## Get a fresh project

When you're ready, run:

```bash
npm run reset-project
```

This command will move the starter code to the **app-example** directory and create a blank **app** directory where you can start developing.

## Learn more

To learn more about developing your project with Expo, look at the following resources:

- [Expo documentation](https://docs.expo.dev/): Learn fundamentals, or go into advanced topics with our [guides](https://docs.expo.dev/guides).
- [Learn Expo tutorial](https://docs.expo.dev/tutorial/introduction/): Follow a step-by-step tutorial where you'll create a project that runs on Android, iOS, and the web.

## Join the community

Join our community of developers creating universal apps.

- [Expo on GitHub](https://github.com/expo/expo): View our open source platform and contribute.
- [Discord community](https://chat.expo.dev): Chat with Expo users and ask questions.
