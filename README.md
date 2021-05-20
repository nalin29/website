# website

A website built using nodejs, express server, rendered using pugjs.
The webpage is built off the html5up template and converted from html to pugjs.
The contact system utilizes the SendGrid service and nodemailer.

The website is hosted using GCP. The setup uses a first entry point through a load balancer fixed to a static ip. 
These load balancers will autodirect http requests to https in addition they will then assign traffic to the priority group with auto scaling for instances.
Then an nginx reverse proxy will redirect traffic to the express server running on node.js.

See the final [result] (https://nalinmahajan.com)
