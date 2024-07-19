# How to run the project

# Setting up .env file

You will need to create a .env file in the root directory of the project. This
file should contain certains variables. You can follow the template defined in the env_example.txt file.

# Setting up docker containers

In order to run this project you first need to build the docker images by running the following command:

```bash
npm run build
```

Once the image has been created you can run it by using the following command:

```bash
npm run dev
```
