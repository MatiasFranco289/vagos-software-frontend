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

# Deployment process

This frontend is currently deployed in an Amazon EC2 instance. Due to low capacity of the actual instance this project cannot be builded on production and neither the docker image can be created.

To handle with this you must follow this process of deployment. Additional scripts and documentation can be found in the [Vago Software Drive Folder]('https://drive.google.com/drive/folders/1MaJ-UiUwklCRkkhVjO1ml_fQHeApVcQt?usp=sharing'). The scripts must be located in the root directory of the project to work correctly and it is possible you must run the command `chmod +x script-name.sh` to give execution permissions.

## Stopping next server in production

First of all you must access the EC2 instance and stop the currently running next server. In order to connect to EC2 instance you can just use the script `connect-production.sh`:

```bash
./connect-production.sh
```

or you can use the ssh command manually:

```bash
ssh -i VagoSoftwareKey.pem instance_username@instance_ip
```

Once you are in production you need to stop the currently running next server. You can do it by executing the script `stop-frontend.sh` located in `/home/ubuntu`:

```bash
./stop-frontend.sh
```

or if you want you can do it manually by finding the PID of the process with the following command:

```bash
ps aux | grep next
```

Now find the process with the name `next-server` copy it PID and use the following command to stop it.

```bash
kill PID
```

## Deleting the previous implmentation

Once the process is stopped you can navigate to the path `/home/ubuntu/vagos-software-frontend` and use the following command to delete the actual directory `.next`:

```bash
rm -rf .next/
```

## Making a new build

Now in you local machine run this command to create a new build:

```bash
npm run build-prod
```

Once the aplication is builded you have to upload the resulting `.next` directory to the EC2 machine by executing the script `upload-build.sh`:

```bash
./upload-buid.sh
```

or you can do it manually by executing this command:

```bash
scp -r -i VagosSoftwareKey.pem .next/ your_ec2_username@your_ec2_ip:/home/ubuntu/vagos-software-frontend
```

## Re-deploying

When the files have finished uploading you can finally use the following command in the EC2 instance in path `/home/ubuntu/vagos-software-frontend` to run the new version.

```bash
npm start &
```
