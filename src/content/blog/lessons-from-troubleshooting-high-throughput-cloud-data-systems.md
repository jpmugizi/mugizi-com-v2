---
title: "Lessons From Troubleshooting High-Throughput Cloud Data Systems Collaboratively"
date: 2023-01-25
categories: [engineering]
description: "Best practices for managing high-throughput data systems that process 50,000 to 100,000 records per second."
---

*This is a professional writing sample that  I submitted for a graduate school application. I am choosing to put it in the World.*  

<span id="more"></span>

## **Background**

The Data Systems Team builds and maintains multiple data pipelines that move data from several external and internal sources, in a batch or streaming fashion. At their peak, our most high volume streaming data pipelines are processing 50,000 to 100,000 records per second. Network saturation during high product utilization seasons such as year-end holidays can cause significant disruption to our data processing operations. Over the last several years of running our cloud data platforms, we have seen some team practices help our team troubleshoot and resolve issues quickly as outlined in the next section.*  *

<div>

<div>

<div>

<div>

## **Recommendations**

## Set up Alerting For The Most Important Metrics 

</div>

</div>

</div>

</div>

In order to properly identify issues and resolve them quickly, you can start by adding alerting when the important metrics reach a problematic threshold. For instance, if you are aware that a significant processing lag causes issues in your data product for your customers, then add alerting so that you can quickly respond and start investigating as soon as that issue occurs. As problems occur and as you discuss them amongst your engineering team members, you will be able to add alerts over time. Focus on the pareto principle at the beginning: 80% of issues will probably because by 20% of the things you want to measure.

<div>

<div>

<div>

<div>

### Provide Training for Monitoring and Alerting Tools 

The amount of tools and software to familiarize with, can get overwhelming especially for new engineers joining your team. To build confidence when debugging issues, provide training to engineers on all your alerting and monitoring tools. This can simply mean allowing them to shadow more senior members or providing well maintained internal documentation and other training material. This will allow your team members to focus on troubleshooting issues and get your data products to a healthy state as quickly as possible, instead of being stuck figuring out how to run simple commands. We saw positive outcomes from setting up dedicated time to provide an overview of our graphing tools, Kubernetes, and Google Cloud platform.

### Implement an on call rotation 

A well implemented on call rotation can serve two important purposes: knowledge sharing and spreading the workload. The former allows all engineers in your team to have at least a cursory understanding of the types of issues that can happen in your system and how to respond to them. The latter helps keep your team healthy and productive, allowing every team member to have dedicated time to work on other important tasks such as features that generate business value.

  

### Streamline Incident Response Communication 

Our platforms are interdependent. We make sure to periodically check on other adjacent teams such as product engineering and networking. It is not unusual that a problem occuring in data systems stems from network saturation or incidents in the main product itself. Keeping communication channels open has proved to be indispensable.

</div>

</div>

</div>

</div>

Slack, an instant messaging platform, has made it easy to troubleshoot incidents collaboratively. To avoid fragmentation and too much context switching, we created a dedicated channel to communicate around incidents and unusual events. Not only has our resolution process gotten much easier, it also helps quickly bringing new team members up to speed. We have also seen great success in creating troubleshooting manuals and conducting post-incidents retrospectives.
