---
title: Matrix Optimization Basics
---

# Matrix Optimization Basics

This article explores how matrices show up in optimization problems and how you can represent them in your docs, math, and notes sections.

## 1. Vectors and Matrices

A vector is an ordered list of numbers, and a matrix is a rectangular grid of numbers.  
They are the basic building blocks for linear algebra in optimization.

### 1.1 Notation

We typically write a vector as \( x \) and a matrix as \( A \).  
An expression like \( Ax = b \) represents a system of linear equations.

## 2. Constraints as Matrices

Many scheduling and routing problems can be written as matrix equations or inequalities.

### 2.1 Capacity Constraints

Capacity constraints can be represented as:

- A matrix \( A \) capturing which task uses which resource.
- A vector \( c \) capturing capacities.
- An inequality \( Ax \le c \).

### 2.2 Time Slot Constraints

Time slots form rows, tasks form columns, and entries indicate whether a task occupies a slot.  
This structure is natural for solver libraries and documentation.

## 3. Connecting Docs, Math, and Notes

Your documentation (AsciiDoc), math (Typst / LaTeX-style formulas), and notes (Logseq-style Markdown) can all describe the same matrix model.

### 3.1 Docs Section

Use the Docs navigation to describe the problem verbally, with patterns and diagrams.

### 3.2 Math Section

Use the Math navigation to dive into the formal matrix equations and proofs.

### 3.3 Notes Section

Use the Notes navigation for daily experiments, parameter tweaks, and results linked back to the main model.