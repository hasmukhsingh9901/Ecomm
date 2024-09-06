## Cloud Guradian

Cloud Guardian is a fully managed cloud security assessment platform designed specifically
for small and medium-sized businesses (SMBs).

## 🚀 Production Website


<a href="http://cloudguardian.co/" target="_blank">Cloud Guardian</a>


### 🛠️ Installation Steps:

### Prerequisites
* Laptop/desktop minimum 4-core CPU, 16 GB RAM and 256 GB HDD/SSD 
* Supported Only Ubuntu-Linux or Windows
* Jira/Bitbucket Access (Get access from devops or PM)
* Get repo access git@github.com:RefactorQ/cloud-guardian-frontend.git

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
git@github.com:RefactorQ/cloud-guardian-frontend.git
```

```
cd cloud-guardian-frontend
```

```
git checkout dev
```

```
npm install
```

#### 5. Create .env file 

```bash
VITE_BASE_URL = KEYS
VITE_CRYPTO_KEY = KEYS
VITE_ENV = KEYS
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
For Infra and access related queries please contact to the DevOps Team
* Narsing Chinte [narsing.chinte@refactorq.com](mailto:narsing.chinte@refactorq.com)

 
