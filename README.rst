==============
Encrypted-HTML
==============

This code sample demonstrates how to encrypt *html* on your laptop with node.js_ and to decrypt data with javascript_ in a browser.

.. _node.js : http://nodejs.org/
.. _javascript : https://en.wikipedia.org/wiki/JavaScript


Quick Start
-----------

In a terminal, type::

  git clone https://github.com/charlyoleg/encrypted_html
  cd encrypted_html
  npm i
  npm run preparation
  npm run start

Try the login::

  jim jim
  jack jack


How encrypted html look like?
-----------------------------

Download the code and browse **web/index.html**.

Or check the same pages on CardanCo_.

.. _CardanCo : http://www.cardanco.com/test_www/joe/

To decrypt the pages use one of these two logins:
  
  - username: *jim*, password: *jim*
  - username: *jack*, password: *jack*

Prerequisites
-------------

* To use the encrypted pages

a modern browser with javascript support. I have checked the code with Firefox_ **27.0.1**.

.. _Firefox : https://www.mozilla.org/en-US/firefox/new/


* To encrypt the data

node.js version **v0.10.21**

::

  > js --verison

* To install the node-module crypto-js

npm version **1.3.12**

::

  > npm --version

Edit the pages
--------------

To change the encrypted page content or add/remove/change privileged logins:

  - edit the file *encryption_preparation/admin_input.js*
  - execute *encryption_preparation/encrypt_html.js* and read the log
  - update manually the files of the directory *web/*

::

  > cd encryption_preparation
  > vim admin_input.js
  > js encrypt_html.js
  > cd ../web
  > vim index.html next.html js/decrypt_html.js

To change the non-encrypted pages, edit directly the files of the directory *web/*.

Install the node-module crypto-js
---------------------------------

The node module crypto-js_ version is **3.1.2-2**.

You need to install crypto-js_ with npm_ locally in the directory *web/* to execute *encryption_preparation/encrypt_html.js*.

::

  > cd encryption_preparation
  > npm list
  > npm config set registry http://registry.npmjs.org/
  > npm install crypto-js

.. _crypto-js : https://www.npmjs.org/package/crypto-js
.. _npm : https://www.npmjs.org/

Security considerations
-----------------------

The *html encryption* lets you publish *private/confidential* data on a `static website`_.

Some strategies to put his private data online:

  - encrypt directly the private data
  - hide the private data with a *complex URL* and create a small encrypted page containing a link to the *complex URL*
  - encrypt and hide the private pages (combination of the two previous)

*Encrypted html* is prone to `brute force attack`_ as an encrypted page can be downloaded one and then used offline. In this case, server settings can not prevent for *brute force attack*. A possible solution could be:

  - hide the private data with a *complex URL*
  - estimate the time requires to break the encryption of the page containing a link to the *complex URL*
  - change from time to time the complexe URL and the corresponding encrypted page

.. _`static website` : https://en.wikipedia.org/wiki/Static_web_page
.. _`brute force attack` : https://en.wikipedia.org/wiki/Brute-force_attack


