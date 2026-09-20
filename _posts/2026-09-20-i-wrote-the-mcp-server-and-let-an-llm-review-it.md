---
layout: post
title: I wrote the code and let an LLM review it
tags: learning MCP AI
date: "2026-09-20 10:33:12 +0530"
---

![A guru at sunset, seated under a tree, whose head is a glowing circuit-board brain labelled LLM,
placing a hand in blessing on a kneeling student; beside them a stack of books titled Knowledge,
Reasoning, Perspective, Clarity and Better
Thinking]({{ site.url}}{{ site.baseurl }}/assets/images/transcript_mcp/llm_as_guru.jpg)

I learned the fundamentals of MCP architecture with an LLM. Instead of passive reading, I implemented a pet project in
which the LLM was responsible for preparing a project plan, reviewing my code, answering my questions, tracking project
progress but not writing a single line of code. In this post, I will describe how I leveraged an LLM for this exercise.

## Why should I still write code by hand?

Learning can't be poured into my head. I understand better when I do things by hand. During my undergraduate studies,
I soon realized that reading computer science theory or a concept of a programming language from a book did not help
much, but I was getting a better understanding when I was implementing it. Rather than considering programming as a
subject, I was pushing hard to implement the exercises. Now vibe coding is popular tech slang, but in my time "Get
your hands dirty with code" was a popular phrase. The Recurse Center (formerly Hacker School) has always championed
learning by building. In a recent analysis of AI's role in learning programming, they highlighted the danger of letting
LLMs do things for you:

> "You can no sooner learn a hard skill like programming by passively consuming LLM output than you can by merely
> listening to a teacher talk. As Holt put it: 'We learn to do something by doing it. There is no other way.'”
> — Recurse Center, [Developing our position on AI](https://www.recurse.com/blog/191-developing-our-position-on-ai)

I am not against using LLMs for generating code. I should leverage LLMs to ship fast but when it comes to learning,
slow and steady wins the race. When I write code without using an LLM, I slow down which gives time to my brain to
digest things better. I can take a pause to think, question or retrospect and then come back. Slowing down helps me to
form a deeper understanding. I can identify flaws in my assumptions and discover underlying truths. I am not the only
one who is insisting on slowing down while learning. Please read
Harvard's [No Need for Speed](https://www.gse.harvard.edu/ideas/ed-magazine/19/08/no-need-speed)
and [Slow down! You learn too fast](https://schoolofthought.substack.com/p/slow-down-you-learn-too-fast).

## Creating a learning plan

For the first time, I had a learning plan which was divided into small actionable steps. Each step had an estimated time
to complete. Additionally, my learning plan also had stretch goals. Each step was isolated, and it also had an expected
quantifiable outcome. All steps were sequentially arranged as if milestones of a long term project.

<style>
  .llm-block > summary { cursor: pointer; }
  .llm-block pre { white-space: pre-wrap; word-break: break-word; }
</style>

<details class="llm-block" markdown="1" open>
<summary><strong>Prompt</strong> — sent to Claude Opus 5 (max effort)</summary>

```markdown
Role: You are a principle software engineer at Amazon. You are having 10+ years of experience.

Background: You are my mentor. I am your mentee. You are guiding me on my next project.

Ask:

* I want to write an MCP server which will be responsible for downloading transcript of a youtube video.
* I will connect this mcp server with Claude and I will share a link of a youtube video and tell Claude to give me
  summary of the video. Claude should invoke my MCP server to fetch transcript of the video and perform analysis.
* The mcp server should be independent of Claude. It should be configurable with any other LLM.
* The mcm server will run locally on my workstation. As a docker container service or demon etc.
* I know Java and Python. We can decide any language to implement this.
* I have found this https://github.com/jdepoix/youtube-transcript-api package which helps me to download the transcript
  via api and it is written in Python.


Rules:

* Understand the requirements. Ask if there are any followup questions until all answers to complete this task is
  received.
* You are not responsible for writing this task. You are responsible for preparing a plan to achieve this in step by
  step manner. I will implement this to practice and sharpen my programming skills. You will act as instructor or tutor.
  You will verify my solutions.
* Include tentative time it can take for each step execution and also include over how much time would it would take to
  complete.
* Each step should have its reference like blog post or any reference material, I will consume them, and then I will
  write code accordingly.
```

</details>

<details class="llm-block" markdown="1" open>
<summary><strong>Follow-up questions</strong></summary>

```markdown
1. Which language do you want to implement the server in? Python (Recommended)
2. How should Claude (and other LLMs) connect to the server? Streamable HTTP (Recommended)
3. How familiar are you with the MCP protocol itself? New to MCP
4. Beyond raw transcript text, which capabilities should the plan include? Metadata
```
</details>

<sup>Claude Opus 5 is a bit verbose. I am only pasting the core plan.</sup>

<details class="llm-block" markdown="1">
<summary><strong>Generated execution plan</strong> — 9 steps + stretch goals (click to expand)</summary>

**Learning Plan: YouTube Transcript MCP Server**

**Prerequisites / Environment**

- Python 3.11+ (3.12 recommended).
- `uv` for env + dependency management (fast, now the MCP-docs default). pip+venv is fine too.
- Docker Desktop (for the containerization step).
- Node.js (only to run the MCP Inspector via `npx` — our primary testing tool).
- Claude Desktop installed (for the final end-to-end step).

---

**Step 0 — Project scaffold & tooling**

**⏱ Estimate: 1–2 hrs** (more if you're new to `uv`/Docker install)

**Goal:** A clean Python project you can run and test, before any MCP or YouTube code exists.

**Concepts to internalize:** virtual environments, dependency pinning, project layout
(`src/` layout vs flat), why we isolate deps.

**Build:**
- Create a new git repo (separate from this blog repo).
- Initialize with `uv init`; add deps: `mcp`, `youtube-transcript-api`, `httpx`.
- Layout: `src/yt_transcript_mcp/` with `server.py`, plus a `tests/` dir and `pyproject.toml`.
- Add a `README.md` stub and `.gitignore`.

**References:**
- uv guide: https://docs.astral.sh/uv/ (read "Working on projects").
- Python packaging / `src` layout: https://packaging.python.org/en/latest/tutorials/packaging-projects/

**How I'll verify:** `uv run python -c "import mcp, youtube_transcript_api"` succeeds; repo layout
is clean; deps are pinned in `pyproject.toml`/`uv.lock`.

---

**Step 1 — MCP fundamentals (reading only, no code)**

**⏱ Estimate: 1.5–2 hrs** (pure reading + note-taking)

**Goal:** Be able to explain, in your own words: what MCP is, the difference between **tools /
resources / prompts**, the client–server–host model, and what "transport" means (stdio vs
Streamable HTTP).

**Concepts to internalize:** MCP is a *protocol* (JSON-RPC based) that standardizes how an LLM app
discovers and calls external capabilities. A **tool** is a function the model can choose to call.
The **host** (e.g. Claude Desktop) runs a **client** that talks to your **server**.

**References:**
- Intro: https://modelcontextprotocol.io/introduction
- Core architecture: https://modelcontextprotocol.io/docs/concepts/architecture
- Tools concept: https://modelcontextprotocol.io/docs/concepts/tools
- Transports (find "Streamable HTTP"): https://modelcontextprotocol.io/docs/concepts/transports
  *(Note: MCP docs URLs shift occasionally — if a link 404s, search from the docs home.)*

**How I'll verify:** You give me a 4–5 sentence explanation of tool-vs-resource and why we chose
HTTP transport for this project. (No code — this is the conceptual foundation everything rests on.)

---

**Step 2 — "Hello world" MCP server over Streamable HTTP + test in Inspector**

**⏱ Estimate: 2–3 hrs** (first contact with FastMCP + Inspector is where the time goes)

**Goal:** A minimal FastMCP server exposing one trivial tool (e.g. `add(a, b)`), served over
Streamable HTTP, and successfully called from the MCP Inspector. This proves your transport,
tooling, and mental model *before* YouTube enters the picture.

**Concepts to internalize:** how FastMCP turns a decorated Python function into a tool; how it
infers the input schema from **type hints + docstring** (so docstrings are not optional — the LLM
reads them to decide when/how to call your tool); how to run over `streamable-http`.

**Build:**
- In `server.py`: `from mcp.server.fastmcp import FastMCP`; create `mcp = FastMCP("yt-transcript")`;
  decorate a function with `@mcp.tool()`; run with `mcp.run(transport="streamable-http")`.
- Note the default endpoint path (`/mcp`) and port; make host `0.0.0.0` so Docker can expose it later.

**References:**
- Python SDK README (quickstart + "Streamable HTTP" section):
  https://github.com/modelcontextprotocol/python-sdk
- Server quickstart: https://modelcontextprotocol.io/quickstart/server
- MCP Inspector: https://github.com/modelcontextprotocol/inspector
  (run `npx @modelcontextprotocol/inspector`, connect via **Streamable HTTP** to your URL).

**How I'll verify:** You connect Inspector to the running server, list tools, invoke `add`, and get
the right answer back. Screenshot or paste the Inspector result.

---

**Step 3 — URL → video ID parser (pure function + unit tests)**

**⏱ Estimate: 1.5–2 hrs**

**Goal:** A robust, well-tested function `extract_video_id(url) -> str` handling all common YouTube
URL shapes: `watch?v=`, `youtu.be/`, `/shorts/`, `/embed/`, extra query params, and invalid input.

**Concepts to internalize:** parse, don't regex-guess — use `urllib.parse`; fail loudly on bad
input with a clear exception; **test-first** design (this is the perfect place to practice TDD
because the function is pure and the cases are enumerable).

**Build:**
- `extract_video_id` in a small `youtube.py` module (keep it out of `server.py` — separation of
  concerns).
- `tests/test_url.py` covering each URL shape + at least two invalid cases.

**References:**
- `urllib.parse`: https://docs.python.org/3/library/urllib.parse.html
- pytest getting started: https://docs.pytest.org/en/stable/getting-started.html

**How I'll verify:** `uv run pytest` is green; I'll throw 2–3 adversarial URLs at your function and
check it handles them (or rejects them cleanly).

---

**Step 4 — Fetch the transcript (library function + error handling)**

**⏱ Estimate: 2–3 hrs** (the version-drift gotcha + exception handling eat time)

**Goal:** A plain function `fetch_transcript(video_id) -> str` (not yet an MCP tool) that returns the
joined transcript text, with real error handling.

**Concepts to internalize:** reading a third-party library's API from its README/source; **the
library's API changed across versions** — older code uses `YouTubeTranscriptApi.get_transcript(...)`
while newer versions instantiate and call `.fetch(...)`. *Check the version you installed and use
the matching API* (great real-world lesson in not trusting stale tutorials). Handle the real failure
modes explicitly: `TranscriptsDisabled`, `NoTranscriptFound`, `VideoUnavailable`.

**Build:**
- `fetch_transcript` in `youtube.py`; join the returned segments into one string.
- Map library exceptions to your own clear, user-facing error messages (the LLM will surface these).
- Awareness note: YouTube blocks *datacenter* IPs. Running locally on your workstation
  (residential IP) is fine; if you ever host this in the cloud you may get blocked — worth a comment.

**References:**
- The library README (API usage + exception list): https://github.com/jdepoix/youtube-transcript-api
- Read the installed source for the exact current method names (`.venv/.../youtube_transcript_api`).

**How I'll verify:** Call it from a scratch script on a real public video (with captions) → get text;
on a video with captions disabled → get your clean error, not a raw stack trace.

---

**Step 5 — Fetch metadata (title / author / thumbnail)**

**⏱ Estimate: 1.5–2 hrs**

**Goal:** A function `fetch_metadata(video_id) -> dict` returning title, author, and thumbnail —
**no API key required.**

**Concepts to internalize:** picking the *lightest* tool for the job. YouTube's **oEmbed** endpoint
(`https://www.youtube.com/oembed?url=<watch-url>&format=json`) returns title, `author_name`, and
thumbnail with no key and no auth — ideal for v1. Trade-off to understand: oEmbed does **not**
include duration. If you later want duration, that needs `yt-dlp` (heavier dep) or the YouTube Data
API (needs a key) — note it as a documented v2 option, don't build it now.

**Build:**
- `fetch_metadata` using `httpx` to call oEmbed; handle non-200 / missing video gracefully.
- Decide your metadata dict shape (keep it small and explicit).

**References:**
- oEmbed spec: https://oembed.com/
- httpx quickstart: https://www.python-httpx.org/quickstart/

**How I'll verify:** Returns correct title/author for a known video; degrades gracefully (empty/partial
metadata, not a crash) when oEmbed fails.

---

**Step 6 — Compose the real MCP tool**

**⏱ Estimate: 1.5–2 hrs**

**Goal:** Replace the hello-world `add` tool with the real one:
`get_video_transcript(url: str) -> dict` that ties together Steps 3–5 and returns a structured
result `{ transcript, metadata }`.

**Concepts to internalize:** designing a tool's *contract* for an LLM consumer — a precise
docstring (this is the tool's "prompt"), typed inputs, and a predictable structured output; keeping
`server.py` thin (it orchestrates; the logic lives in `youtube.py`); returning errors in a form the
model can relay to the user.

**Build:**
- `@mcp.tool()` wrapper calling `extract_video_id → fetch_transcript → fetch_metadata`.
- Write the docstring deliberately: say what it does, what a valid `url` looks like, what it returns.

**References:**
- Tool design / structured output in the Python SDK README (tools section):
  https://github.com/modelcontextprotocol/python-sdk
- Tools concept (recap): https://modelcontextprotocol.io/docs/concepts/tools

**How I'll verify:** In MCP Inspector, call `get_video_transcript` with a real URL → transcript +
metadata come back; call with a bad URL and a captions-disabled video → clean, informative errors.

---

**Step 7 — Containerize as a local service (Docker)**

**⏱ Estimate: 2–3 hrs** (add ~1 hr if Docker networking is new to you)

**Goal:** The server runs as a Docker container/daemon on your workstation, listening on a port,
restartable, independent of any client.

**Concepts to internalize:** slim base images (`python:3.12-slim`), layer caching (copy dep files
before source), binding to `0.0.0.0`, `EXPOSE` + port mapping, running detached (`-d`) and with a
restart policy so it behaves like a daemon; `docker compose` for a one-command start.

**Build:**
- `Dockerfile` (install deps, copy source, expose the MCP port, run the server).
- Optional `docker-compose.yml` with a restart policy.
- Run detached; confirm the container survives and the port is reachable.

**References:**
- Docker Python guide: https://docs.docker.com/language/python/
- Official Python image notes: https://hub.docker.com/_/python
- Dockerfile best practices: https://docs.docker.com/build/building/best-practices/

**How I'll verify:** `docker run -d -p <port>:<port> ...`, then point MCP Inspector at the
containerized URL and successfully call `get_video_transcript`. Container restarts cleanly.

---

**Step 8 — Connect to Claude Desktop + prove LLM-agnosticism**

**⏱ Estimate: 1–2 hrs**

**Goal:** End-to-end: paste a YouTube link in Claude, ask for a summary, watch Claude call *your*
containerized server, fetch the transcript, and summarize.

**Concepts to internalize:** Claude Desktop connects to a remote/HTTP MCP server as a **custom
connector** (Settings → Connectors → Add custom connector → your local URL). Understand *why* this
is LLM-agnostic: nothing in your server knows about Claude — any MCP-capable client (other hosts,
the OpenAI Agents SDK's MCP support, etc.) can use the same URL. That's the payoff of the HTTP-
transport decision.

**Build:**
- Register the running container's URL as a custom connector in Claude Desktop.
- Test prompt: *"Summarize this video: `<link>`"* → confirm Claude invokes the tool.
- (Optional flex) point one other MCP client at the same URL to prove independence.

**References:**
- Connecting a server (user side): https://modelcontextprotocol.io/quickstart/user
- Anthropic help on custom connectors / remote MCP:
  https://support.anthropic.com/en/articles/11175166-about-custom-connectors-remote-mcp
  *(If the connector UI differs on your version, MCP Inspector already proved the server works;
  the remaining issue is purely client-side wiring.)*

**How I'll verify:** You share the Claude transcript showing the tool call + a summary derived from
the real transcript. That's "done."

---

**Stretch goals (v2 — only after v1 works end-to-end)**

Each is a clean, isolated next lesson:
1. **Caching** — file or SQLite cache keyed by video ID, to avoid refetching and survive rate limits.
2. **Language selection** — expose `list_transcripts()`, let the caller pick a language / fall back
   to auto-generated captions.
3. **Timestamps + chunking** — return timestamped segments; handle very long transcripts so
   summaries can cite moments.
4. **Duration metadata** — add `yt-dlp` for full metadata including duration.
5. **Hardening** — structured logging, config via env vars, a proper test suite in CI, health check.

</details>


## Executing plan

I had not written production grade Python code in the last 7 years. Tools like [uv](https://docs.astral.sh/uv/)
and [Fast-mcp](https://gofastmcp.com/getting-started/welcome) were not invented when I was writing Python code. Without
LLMs, I would have struggled to identify the right scope. By not using LLMs for writing code, I was going back to the
library documentation to make choices. And I was also getting instant feedback on my choices. This helped me to
slow down and as a result I remembered the syntax and examined my decisions. That would not have been possible if an LLM
had written that code. After I completed my actions, I asked the LLM to verify the outcome against the expected
outcome of a step. If I was going in a wrong direction, then I prompted the LLM to only give me high-level hints rather
than fixing errors on my behalf.

The LLM estimated ~18 hours. I spent about 20+ hours, spread across ~10 sessions of 2+ hours on weekends and holidays. I
took more time than planned, but I don't want to blame the LLM for this. I am suffering from a perfectionist
syndrome :/. In the middle of execution, I extended the scope of the project by making it more generic and extensible. I
tried to apply design patterns, testing best practices which were never in execution plan. The LLM highlighted that I
had done more than the plan and also acknowledged the importance of my decisions.

I executed this plan in-consistently. Because of the LLM, I could go back to the conversation and reload context in my
brain from a point where I had left off. It was extremely helpful to sustain my motivation for long term execution.

I requested the LLM to evaluate my code at each step. The LLM reviewed my code, highlighted where I had diverged and
summarized what was done and what remained.

<details class="llm-block" markdown="1" open>
<summary><strong>Prompt</strong> — requesting LLM to evaluate my work</summary>

```markdown
I have completed step 0. Can you please verify that I have completed steps?

Please try to help me if I have completed all expected steps. I have invoked 'uv lock' at the end.

I was going through https://packaging.python.org/en/latest/tutorials/packaging-projects/ and it says configuring 'uv' as
a build system. Can you please help me by sharing if I need to perform any updates to pyproject.toml file any build
system specific configurations at step 0?

Also, I am skipping updating the readme.md file right now. I will update at the last.
```

</details>

<details class="llm-block" markdown="1">
<summary><strong>Feedback</strong> - initial evaluation</summary>

```
Found it and reviewed it. Nice work — the core of Step 0 is solid. Here's my verification, then the answer to your
build-system question (which is a genuinely good thing to have noticed).

✅ Verification checklist

Item	Status	Notes
Separate git repo	✅	git init done, outside the blog repo
Three deps added	✅	httpx, mcp, youtube-transcript-api all in pyproject.toml
uv.lock present	    ✅	you ran uv lock — good
Import sanity check	✅	import mcp, youtube_transcript_api, httpx → ok
src/ package	    ⚠️ empty	src/ and tests/ dirs exist but have no files — no yt_transcript_mcp/, no server.py, no __init__.py
.gitignore	        ⚠️ missing	no root .gitignore (uv hides its own venv via .venv/.gitignore, but you still want a project one for __pycache__/, .pytest_cache/, etc.)
main.py at root	    ℹ️ leftover	uv init dropped a default main.py — we'll delete it once the package exists
README	            ⏭️ skipped	fine, as you said — do it last
So: 80% there. Two real gaps (empty src/ package, missing .gitignore) and one leftover file. Let's fix those and answer your build-system question together, because they're connected.

🎓 Your question: do I need [build-system] config?
Excellent instinct to ask. The short answer: it depends on whether your project is an application or a package — and because we chose a src/ layout, we want it to be a package. Here's the mental model:

The packaging.python.org tutorial you read is about building distributable artifacts (wheels/sdists) to publish to PyPI. You are not publishing to PyPI. So you might think "skip it." But there's a subtlety:

App style (what uv init gave you by default): a flat main.py you run directly. No [build-system], and your project is not installed into the venv — so import yt_transcript_mcp would fail from a src/ layout.
Package style (what we actually want): with a [build-system], uv sync installs your own code into the venv in editable mode. Then import yt_transcript_mcp works from anywhere — crucially, from your tests/ in Step 3 and when you run the server in Docker in Step 7.
Since our plan uses src/yt_transcript_mcp/ and we'll import it from tests, yes — you should add a build-system. This is the correct call, not premature complexity.

What to add to pyproject.toml:

That's it — hatchling is the lightweight default build backend uv uses. (You could also have gotten all this automatically by running uv init --package instead of plain uv init. Good to know for next time.)

📖 Reference: uv — Project structure & --package/--lib and Build systems in uv.

🔎 One more heads-up: Python 3.14
You pinned requires-python = ">=3.14" and .python-version = 3.14. Imports pass, so it works — but 3.14 is bleeding-edge. The risk shows up later: some dependencies (or the python:3.14-slim Docker image in Step 7) may lag on prebuilt wheels, causing slow or failing builds. Not a blocker now. If you want the smoothest ride, pinning to 3.12 is the safe default. Your call — just know why I'm flagging it.

📝 To close out Step 0, please:

Add the [build-system] block above to pyproject.toml.
Create the package: src/yt_mcp/__init__.py (empty) and src/yt_mcp/server.py (empty for now).
Add tests/__init__.py (empty) so pytest discovers it cleanly later.
Delete the leftover root main.py.
Add a root .gitignore (at minimum: .venv/, __pycache__/, .pytest_cache/, *.pyc).
Run uv sync — this should now install yt-mcp itself, then confirm:

Then show me: your updated pyproject.toml, the output of that import check, and — you skipped these earlier 😄 — your answers to the two conceptual questions:

Why a src/ layout instead of server.py in the repo root?
What's the difference between a dep in pyproject.toml vs one pinned in uv.lock?
Knock those out and Step 0 is a clean pass. 🚀
```

</details>

<br>

After performing remaining steps, I asked the LLM to re-verify with the prompt below.

<details class="llm-block" markdown="1" open>
<summary><strong>Prompt</strong></summary>

```
Can you re-check? I have performed required changes
```

</details>

<details class="llm-block" markdown="1">
<summary><strong>Feedback</strong> — acknowledging that step-0 is completed</summary>

```
That's a clean pass. ✅ [build-system] is now its own table, uv sync is happy, and import yt_mcp works — the project is correct and portable now.

Step 0: COMPLETE. 🎉 Your scaffold is real: isolated env, pinned deps, proper src/ package that installs editable, tests dir ready, .gitignore in place.

[ Truncated ]

🎯 Next: Step 1 — MCP fundamentals (reading only, ~1.5–2 hrs)

[ Truncated ]

[Intro / What is MCP](https://modelcontextprotocol.io/introduction)
[Core architecture — host ↔ client ↔ server](https://modelcontextprotocol.io/docs/concepts/architecture)
[Tools](https://modelcontextprotocol.io/docs/concepts/tools)
[Transports — focus on Streamable HTTP (our choice)](https://modelcontextprotocol.io/docs/concepts/transports)

(If a link 404s — MCP docs move occasionally — search from the docs home page.)

As you read, hold these questions in mind (I'll quiz you, no code):

[ Truncated ]
```
</details>

<br>
At some point, the LLM not only evaluated my progress but also acknowledged that I had done what was beyond the scope.

<details class="llm-block" markdown="1">
<summary><strong>Prompt</strong></summary>
```
  I have updated the code and added requested exception. It should work fine now. Please validate and confirm if we are
  done with step-4
```
</details>

<details class="llm-block" markdown="1" open>
<summary><strong>Feedback</strong></summary>

```
Step 4 is complete. What you built beyond the original spec: a domain entity separate from the library's types, an ABC
so the transcript source is swappable, a table-driven exception translation layer, retriable/non-retriable
classification, and validation at the mapping boundary with DataError deliberately excluded from translation. That last
one is the piece most people get wrong — your own bugs no longer masquerade as YouTube's.

Two housekeeping items before Step 5: delete the stray 2 file at the repo root, and commit — Steps 3 and 4 are both
still uncommitted.
```
</details>

## Outcome — Transcript MCP server

Please find the Transcript MCP server code here: [Github](https://github.com/ultimatecoder/transcript_mcp)

### Architecture

Nothing in the server knows which LLM is calling it. Any MCP client speaks to the same
`localhost:8000/mcp` endpoint over Streamable HTTP, and the server talks to YouTube through
`youtube-transcript-api`. That is what the HTTP transport decision bought me.

![Architecture diagram: Claude and Codex both call a single Transcript MCP server over Streamable
HTTP at localhost:8000/mcp; the server exposes one tool, get_transcript(url), and fetches captions
from YouTube through youtube-transcript-api, returning the transcript as
JSON]({{ site.url}}{{ site.baseurl }}/assets/images/transcript_mcp/architecture.png)

*Figure 1 — One MCP server, two interchangeable clients. Blue arrows are requests, green are
responses.*

### Providers and extractors

The tool itself is thin. `TranscriptProviderManager` picks a provider, and the provider delegates
URL parsing to a chain of extractors. Adding a second transcript source, or a new YouTube URL shape,
means adding a class rather than editing an existing one.

![Class diagram: the server module holds a FastMCP instance exposing get_transcript; a factory
builds TranscriptProviderManager, which delegates to the TranscriptProvider abstract base class,
implemented by YtTranscriptApiBasedProvider; URL parsing is delegated to
YtURLAttributeExtractorCoordinator over an YtURLAttributeExtractor ABC with standard-URL and
short-URL implementations]({{ site.url}}{{ site.baseurl }}/assets/images/transcript_mcp/request-flow.svg)

*Figure 2 — Both extension points are abstract base classes: the transcript source and the URL
extractor.*

### Domain model

The library's types never leave the boundary. Mappers convert `FetchedTranscript` into my own frozen
dataclasses, so a change in `youtube-transcript-api` cannot ripple through the rest of the server.

![Class diagram in three columns: external entities FetchedTranscript and FetchedTranscriptSnippet
on the left, a column of mapper classes in the middle, and frozen dataclasses Transcript,
TranscriptMetadata and TranscriptLineItem on the
right]({{ site.url}}{{ site.baseurl }}/assets/images/transcript_mcp/domain-model.svg)

*Figure 3 — External entities enter on the left, mappers translate, domain entities leave on the
right.*

### Error model

Every library exception is translated into one of my own, classified as retriable or not. `DataError`
is deliberately excluded from that translation, so my own bugs surface as my own bugs instead of
masquerading as a YouTube failure.

![Diagram mapping youtube_transcript_api exceptions such as VideoUnavailable, TranscriptsDisabled
and NoTranscriptFound onto the server's own error types, each classified under RetriableError or
NonRetriableError, with DataError marked as defined but not
raised]({{ site.url}}{{ site.baseurl }}/assets/images/transcript_mcp/error-model.svg)

*Figure 4 — Where each error starts, and what the caller actually receives.*

## Takeaways

The LLM never wrote a line of this server, and that was the point. It planned, reviewed, answered my questions and
tracked progress. I typed. Seven years after my last production Python, I have a working MCP server running in a
container, and I can still explain every decision in it without opening the code. The cost was real. The plan
estimated ~18 hours and I spent about 20+ hours, spread across ~10 sessions that I kept skipping. I will do this again
for the next unfamiliar technology. Writing code by hand is slower, and the slowness is the mechanism, not the price. 