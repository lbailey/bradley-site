# bradley-site
duplicate of bradley site

## Table of Contents
- [Abstract](#abstract)
- [Development](#development)
- [Heroku](#heroku)
- [License](#license)

## Abstract
- __theme based:__ set contains out-of-box markup and styling for quick, responsive pages
- __fully responsive:__ minimal effort development for desktop, mobile, and tablet
- __cloud hosting:__ zero server maintenance with Heroku performance-driven cloud hosting
- __simple releases:__ any merge to `master` will trigger a hands-free release
- __easy development:__ vagrant makes for simple, assured local development and testing

## Development
Development should be as straight-forward and lightweight as possible. This 
section will outline best practices required to develop and test code meant
for production.

### Github
Github can be utilized to be the easiest or most complex tool in any development,
so this is meant to be a quick guide on how best to work in this repository.
This doc assumes basic familiarity with the CLI, and assumes a Mac OS X machine.

#### Setup

In order to start development, navigate to a directory in the Terminal and 
confirm you have `git` installed and are ready to develop. You will also need
to install and use `Homebrew`. 

```
$ git --version
git version 2.9.2
$ brew --version
Homebrew 2.0.5
```

If git is not installed, you can use Homebrew to install it. To install Homebrew:

```
$ /usr/bin/ruby -e "$(curl -fsSL https://raw.githubusercontent.com/Homebrew/install/master/install)"
```

To install git using Homebrew, and set your credentials:

```
$ brew install git
$ git --version
git version 2.9.2
$ git config --global user.name "First Last"
$ git config --global user.email "first.last@gmail.com"
```

Once you have this set, you are free to clone the repository. 

```
$ cd ~/Documents
$ mkdir local/bradleysitedesign/www
$ cd local/bradleysitedesign/www
$ git clone https://github.com/bradleysitedesign/portfolio.git
$ cd portfolio
$ git status
``` 

### Vagrant

Vagrant is a tool to run code rendered in a virtual environment in order to 
accurately develop so that you can mimic the production environment exactly.

Download for macOS: https://www.vagrantup.com/downloads.html

```
$ vagrant --version
Vagrant 2.2.4
```

Basic commands used below for vagrant: `vagrant up`, `vagrant reload`, 
and `vagrant halt`

#### Setup

This section essentially summarizes steps from [Part 1](https://www.taniarascia.com/what-are-vagrant-and-virtualbox-and-how-do-i-use-them/) and Steps 1-4 of [Part 2](https://www.taniarascia.com/how-to-install-apache-php-7-1-and-mysql-on-ubuntu-with-vagrant/)

##### Partion the VM and Apache

This section sets up apache and sets the partions and sync for your virtual 
machine setup to test locally. 

```
$ cd ~/Documents/local/bradleysitedesign/www
$ vagrant box add ubuntu/trusty64
$ vagrant init ubuntu/trusty64
$ vagrant plugin install vagrant-vbguest
$ vagrant up
$ vagrant ssh
```

Vim is a very useful but very difficult inline text-editing tool. It can 
be stressful to use if you haven't before. After typing a `vim` command, 
use the keyboard arrow keys to navigate to the end of the file, and to 
begin typing, tap the letter `i` on the keyboard. You will see that the 
inline editor says `-- INSERT --`. To stop inserting, hit Ctrl-C.

```
:~$ sudo vim /etc/apache2/apache2.conf
```

Navigate to the end of the file and type the keyboard key `i` to be able to 
paste the line `ServerName localhost` somewhere within the file. Type Ctrl-C, 
then type `:wq` and hit `Enter`. Check to confirm the file looks correct 
by using the `cat` command, and restart the server. 

```
:~$ cat /etc/apache2/apache2.conf
:~$ sudo service apache2 restart
:~$ sudo apache2ctl configtest
Syntax OK
:~$ exit
```

##### Sync Directory 

Navigate to the folder in `/Documents/local/bradleysitedesign/www` in which
ever text editor you prefer and edit the `Vagrantfile` there. You are going
to uncomment (remove the `#`) from the private network line and add the 
folder sync:

```
# config.vm.network "private_network", ip: "192.168.33.10"
```

should look like 

```
config.vm.network "private_network", ip: "192.168.33.10"
config.vm.synced_folder "www/portfolio", "/var/www/html"
```

Then reload the VM using `vagrant reload`


##### Finalize Domain

In order to have an easier domain to develop with locally, you will need
to update your etc/hosts file to give a hostname to your VM website. Use `vim`
again to add the line `192.168.33.10  bradley.dev` to the bottom of the file
using `i` to `-- INSERT --`, paste the above, and type Ctrl-C, then type `:wq`
and hit Enter. You can use `cat` command in the CLI to verify if the file is 
properly updated. 

```
$ vim /etc/hosts
$ cat /etc/hosts
...
192.168.33.10   bradley.dev
```

Now, with vagrant running, use Chrome to open `bradley.dev` in your browser
and you should see it successfully display the website!

## Heroku


## License


