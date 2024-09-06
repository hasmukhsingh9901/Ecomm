## Cloud Guradian

Cloud Guardian is a fully managed cloud security assessment platform designed specifically
for small and medium-sized businesses (SMBs).

## 🚀 Production Website

[cloudguardian.co](https://cloudguardian.co/)

### 🧐 Features

*  Post Creation / Interaction
*  Townhall feeds and timeline
*  Pagination of the post in Townhall
*  Search posts and people
*  Snip-it Creation / Interaction
*  Friends follow/unfollow
*  Roundtable messages Creation / Interaction


### 🛠️ Installation Steps:

### Prerequisites
* Laptop/desktop minimum 4-core CPU, 16 GB RAM and 256 GB HDD/SSD 
* Supported Only Ubuntu-Linux or Windows
* Jira/Bitbucket Access (Get access from devops or PM)
* Get repo access https://bitbucket.org/loktantram-admin/khulke_node/

#### 1. Install NVM using below link
- [Install on Linux](curl -o- https://raw.githubusercontent.com/nvm-sh/nvm/v0.39.1/install.sh | bash)
- [Install on Windows](https://github.com/coreybutler/nvm-windows/releases)
- [Install on Mac](https://collabnix.com/how-to-install-and-configure-nvm-on-mac-os)

#### 2. Install Node (version 14) using below link

```bash
nvm install 14
nvm use 14
```

#### 3. Get the Mongo DB URI

* For dev environment MONGO_DB_URI
mongodb://devadmin:XXXXXXXX@13.127.222.211:27017/?directConnection=true

#### 4. Clone the Repository and Install Requirements


```
https://<your_username>@bitbucket.org/loktantram-admin/khulke_node.git
```

```
cd khulke_node
```

```
git checkout dev
```

```
npm install
```

#### 5. Create .env file 
* Create .env file in the khulke_node directory and paste the below credentials recieved from team
[Khulke Backend Team](https://teams.microsoft.com/_#/conversations/General?threadId=19:rVvWA7P1KfZIjILzyKDfguC7b7Xszf5QE8xIUApv0l01@thread.tacv2&ctx=channel)

```bash
APP_ENV = KEYS
PORT = KEYS
DEVELOPMENT_URL = KEYS
PRODUCTION_URL = KEYS
NODE_ENV = KEYS
```


#### 6. Run the below command in the khulke_node root folder to start the server

```
npm start
```

#### 7. For Testing these REST API's 

* Get the postman link/json from team

Link - postman link 


### 💻 Built with

Technologies used in the project:

* Node
* MongoDB
* Koa
* Docker
* Infra AWS
* Kubernetes
* Storage S3
* Jenkins CI/CD

### Code Contributors
* Deepak Kumar [deepak.kumar@refactorq.com](mailto:deepak.kumar@refactorq.com) 


### Support:
If you are facing problem to setup the project then please ask in the
[Khulke Backend Team](https://teams.microsoft.com/l/channel/19%3a5cc32ece8b114c0dbb4d1e5f6befe032%40thread.tacv2/Khulke%2520Backend%2520Team?groupId=4479ca8d-c529-4878-bd18-fe5c0910382d&tenantId=2743a4d4-e89a-4824-b510-8fa0e7cc02ed)

For Infra and access related queries please contact to the
[DevOps Team](https://teams.microsoft.com/l/team/19%3aCWzBqr-0ckPqGahJTR3q4H0rlavxFNDLPNbv2Dshiic1%40thread.tacv2/conversations?groupId=269d19aa-48a1-4af3-a78c-610c478d7c8a&tenantId=2743a4d4-e89a-4824-b510-8fa0e7cc02ed)

* Narsing Chinte [narsing.chinte@refactorq.com](mailto:narsing.chinte@refactorq.com)

 
