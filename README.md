```markdown
# Color Display Application

This is a simple Node.js web application that dynamically displays a webpage with a customizable background color. This document outlines how to run the application directly on a server without using Docker.

## Prerequisites

Before you begin, ensure you have the following installed:

*   **Node.js:** Version 16 or higher. You can download it from [nodejs.org](https://nodejs.org/).
*   **npm:** Node Package Manager, which comes with Node.js.
*   **Git:** (Optional) For cloning the repository.

## Installation

1.  **Create a Virtual Machine or Cloud Instance:**

    *   Use a cloud provider like AWS EC2, Azure VM, or GCP Compute Engine.
    *   Choose an Ubuntu 20.04 image.
    *   Select at least a `t2.micro` instance (1 vCPU, 1GB RAM) for testing.

2.  **Open Inbound Ports:**

    *   Configure your firewall to allow inbound traffic on port `8080` (or any other port you plan to use).

3.  **SSH into the Instance:**

    *   Connect to the instance using SSH.

4.  **Install Required Tools:**

    *   Update the package list and install `git`, `nodejs`, and `npm`:

        ```bash
        sudo apt update
        sudo apt install -y git nodejs npm
        ```

5.  **Clone the Repository (Optional):**

    If you haven't already, clone the repository to your local machine:

    ```bash
    git clone https://github.com/HILL-TOPCONSULTANCY/COLOR-APP.git
    cd COLOR-APP
    ```

6.  **Install Dependencies:**

    Navigate to the project directory and install the required npm packages:

    ```bash
    npm install
    ```
7.  **Start the Application with the Default Color:**

    To run the application with the default background color (blue), use the following command:

    ```bash
    npm start
    ```

8.  **Start the Application with a Custom Color:**

    To specify a custom background color, set the `COLOR` environment variable before running the application. For example, to set the color to green:

    ```bash
    COLOR=green npm start
   ```
## Accessing the Application

Once the application is running, you can access it in your web browser at the following URL:
http://localhost:8080
```
