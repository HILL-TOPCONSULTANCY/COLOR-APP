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
---
# Running Color Display Application with Docker on an AWS EC2 Instance

These steps outline how to run the Color Display Application using Docker on an AWS EC2 instance.

## Prerequisites

*   An active AWS account.
*   Basic knowledge of AWS EC2 and Docker.
*   Docker installed on your local machine (for building the image).

## Steps

3.  **Install Docker on the EC2 Instance:**

    *   Once connected, install Docker:

        *   For Ubuntu:

            ```bash
            sudo apt update
            sudo apt install -y docker.io
            sudo systemctl start docker
            sudo systemctl enable docker
            sudo usermod -aG docker $USER
            newgrp docker
            ```

        *   For Amazon Linux 2:

            ```bash
            sudo yum update -y
            sudo amazon-linux-extras install docker
            sudo systemctl start docker
            sudo systemctl enable docker
            sudo usermod -aG docker $USER
            newgrp docker
            ```

    *   Verify Docker installation:

        ```bash
        docker --version
        ```

4.  **Clone the Application Repository:**

    *   Clone the application repository:

        ```bash
        git clone https://github.com/HILL-TOPCONSULTANCY/COLOR-APP.git
        cd COLOR-APP
        ```

5.  **Build the Docker Image:**

    *   Navigate to the project directory containing the `Dockerfile`.
    *   Build the Docker image:

        ```bash
        docker build -t hilltopconsultancy/color-app:blue .
        ```

        *   This will build the image with the default color (blue).

6.  **Run the Docker Container:**

    *   Run the Docker container with port mapping and environment variable:

        ```bash
        docker run -d -p 8080:8080 -e COLOR=blue hilltopconsultancy/color-app:blue
        ```

        *   Replace `blue` with the desired color (e.g., `green`, `red`, `#FF0000`).
        *   If you want to use a specific tag, replace `latest` with the tag name (e.g., `hilltopconsultancy/color-app:blue`).
        *   If you want to pull the image from Docker Hub (assuming you've pushed it):

            ```bash
            docker pull hilltopconsultancy/color-app:latest
            docker run -d -p 8080:8080 -e COLOR=blue hilltopconsultancy/color-app:latest
            ```

7.  **Access the Application:**

    *   Open a web browser and navigate to:

        ```
        http://your-ec2-public-ip:8080
        ```

        *   Replace `your-ec2-public-ip` with the public IP address or DNS of your EC2 instance.

## Changing the Environment Variable (Color)

There are a few ways to change the color after the container is running:

1.  **Stop and Re-run the Container:**

    *   Stop the running container:

        ```bash
        docker stop <container_id>
        ```

        *   Replace `<container_id>` with the ID of your container (you can find it using `docker ps`).
    *   Re-run the container with the new environment variable:

        ```bash
        docker run -d -p 8080:8080 -e COLOR=green hilltopconsultancy/color-app:latest
        ```

        *   Replace `green` with the new color you want to use.

2.  **Using `docker update` (Less Common, May Not Work as Expected):**

    *   You can try to update the environment variable using `docker update`, but this might not always work as expected for running containers:

        ```bash
        docker update --env COLOR=new_color <container_id>
        ```

        *   After this, you might need to restart the container for the changes to take effect.  However, stopping and re-running is generally the more reliable approach.

