# Instructions

Follow instructions at https://nonedhudla.xyz/installing-synapse-on-kubernetes/ for setting up


**:hammer\_and\_wrench: Proposed technical solution**

### Set up a basic Matrix server on a Haven cluster, domain developer.overheid.nl
* See matrix-server folder for example configuration. We can create a helm chart for this.

### DO not offer identities, just rooms
* This will lead to issues, since I have not been able to login as a guest in the Element app. Running a custom identity server will be better, especially when users already have a Matrix account
See https://github.com/matrix-org/matrix-doc/blob/master/specification/modules/guest_access.rst

### Explore how we can integrate Matrix chat rooms with our content, and or with the forum
* Create public room or community after adding API
  1. Get token: https://matrix.org/docs/spec/client_server/latest#post-matrix-client-r0-login
  1. Create room: https://matrix.org/docs/api/client-server/#!/Room32creation/createRoom
* Create a post on the forum linking to the chat room and in the chat room a link to the forum

### Explore how we can use identities from other organisations in our Matrix rooms
* Setup custom identity server: https://github.com/kamax-matrix/mxisd in case of privacy issues. Ultimately the custom identity server will need to contact Matrix's identity server.


**:link: Reference links**

* Delegation: https://github.com/matrix-org/synapse/blob/master/docs/delegate.md
* Matrix API docs: https://matrix.org/docs/spec/client_server/latest
* Custom identity server: https://github.com/kamax-matrix/mxisd
