# Flickd AI Hackathon – Smart Tagging & Vibe Classification Engine

## Overview

Flickd is reimagining how Gen Z shops — through scroll-native, video-first, vibe-led discovery.  
The shopping journey doesn’t start at a search bar — it starts with a Reel. This hackathon challenges AI/ML engineers to build the backbone of Flickd’s intelligent tagging and vibe classification system from short fashion videos.

This document outlines the 7-day competition to hire Flickd’s first ML engineer, covering the objective, deliverables, dataset, evaluation, tech stack, timeline, and submission requirements.

---

## Objective

Build a fully working MVP of Flickd’s **Smart Tagging & Vibe Classification Engine** with the following capabilities:

1. Extract frames from videos.  
2. Detect fashion items using a pretrained YOLOv8 object detection model.  
3. Match detected items to a product catalog using image embeddings (CLIP) and FAISS similarity search.  
4. Analyze captions or transcripts to classify the video’s vibe using NLP techniques.  
5. Output structured data via API or JSON.  

*Note:* UI development is not required — focus is on backend ML logic and output generation.

---

## What You’ll Build

### 1. Object Detection (YOLOv8)

- Detect fashion items from video keyframes such as tops, bottoms, dresses, jackets, earrings, bags, shoes.  
- For each detection, output:  
  - Class name  
  - Bounding box coordinates `(x, y, w, h)`  
  - Confidence score  
  - Frame number  

### 2. Product Matching (CLIP + FAISS)

- Crop each detected item from the frame.  
- Generate CLIP image embeddings.  
- Match against a pre-embedded FAISS index built from the product catalog (Shopify image URLs).  
- Label matches as:  
  - Exact Match (`similarity > 0.9`)  
  - Similar Match (`0.75 – 0.9`)  
  - No Match (`< 0.75`)  

### 3. NLP-Based Vibe Classification

- Using captions, hashtags, or optional audio transcripts, classify each video into 1–3 vibes:  
  - Coquette  
  - Clean Girl  
  - Cottagecore  
  - Streetcore  
  - Y2K  
  - Boho  
  - Party Glam  
- NLP methods can be rule-based or transformer models (e.g., spaCy, HuggingFace DistilBERT).  

### 4. ## Demo Video

Watch the full demo walkthrough showcasing the pipeline from video input to final JSON output:

[![Watch Demo](https://github.com/Bhavyasree2003/Flickd-_Hacathon-/blob/main/demo3%20(1).mp4)]

**Demo Link:** https://github.com/Bhavyasree2003/Flickd-_Hacathon-/blob/main/demo3%20(1).mp4
