---
title: Working with dev containers
date: 2026-07-31
description: I'm using dev containers to make my development environments more portable and reusable.
---

In corporate software engineering positions for the first ten years of my career, it was normal for a new start to spend a week or more setting up their development environment. If you were lucky, you would have a machine image - or more likely a script - that would install all the dependencies for the software you were working on. More likely you would install the dependencies yourself following a half-maintained set of instructions on an internal wiki, and then spend a few days with your team trying to get your environment working correctly.

That problem can be even worse in personal projects. They are far more likely to be throwaway prototypes, to use esoteric frameworks and libraries, are dramatically less likely to have a well-maintained set of instructions, and you're *far* more likely to be working on more than one at a time.

Environment managers like `nvm`, `pyenv`, and the like help when most of your work lives in a single ecosystem. My own work spans a wide variety of ecosystems - either because I'm switching between projects, or because I'm prototyping. At times, I've ended up with several version managers, each working slightly differently. They also typically *don't* help you manage any cross-cutting dependencies such as CLI tools like `kubectl` or `helm`.

We're all familiar with the "it works on my machine" problem, and we've all gotten used to containerising application builds so that they run consistently across different computing environments.

Dev containers are a way to bring that same consistency to your development environment. They've gotten quite popular for developing in cloud environments, but they can be equally useful for local development.

Useful links:

- [Dev Containers](https://containers.dev/)
- [Developing inside a Container](https://code.visualstudio.com/docs/devcontainers/containers)

## Environment as code

The first and most useful aspect of working with dev containers to me is that your instructions for building your development environment are automated, portable, and most especially version controlled alongside whatever project needs the environment.

This is *especially* valuable for personal projects. The less time I spend setting up and documenting my development environment, the more time I can spend on the actual project.

As an example, here is a simple devcontainer for a hypothetical Go project:

```json
{
  "name": "My awesome Go project devcontainer",
  "image": "mcr.microsoft.com/devcontainers/base:2.1.13",
  "features": {
    "ghcr.io/devcontainers/features/go:1": {
      "version": "1.26.5"
    }
  },
  "runArgs": [
    "--name",
    "my-awesome-go-project-devcontainer"
  ]
}
```

I don't need anything other than Docker installed on my machine to be able to build this dev container and start developing with it. In particular, I know that I'll get the same version of Go (and of any other dependencies that I add) regardless of what machine I'm working on, and so will anyone else who wants to work on the project.

## Dev container features

One of the most useful capabilities of dev containers is composing your development environment from reusable [features](https://containers.dev/features). While you *can* define your dev containers by creating a `Dockerfile` and manually installing every dependency - and this is already a huge improvement! - dev container features make it easy to reuse cross-cutting dependencies across multiple projects.

I've often wished for this capability in application containers!

## Other tools

There's an extent to which dev containers solve the same problem as tools like [asdf](https://asdf-vm.com/), [direnv](https://direnv.net/), and especially [nix](https://nixos.org/).

My personal experience is I enjoy using dev containers largely because *I already need docker on my machine for other reasons*. The fewer dependencies I have to install and manage myself, the better.

## My dev containers

Lots of my repos have a `./devcontainer/devcontainer.json` file that builds the development environment for that project directly from a barebones third-party base image.

I also maintain a collection of [my own dev container features](https://github.com/iaingalloway/features) and especially [my own dev container base images](https://github.com/iaingalloway/devcontainers) because having a pre-built base image to pull means the dev containers CLI has a lot less work to do when creating the container image for a project.
