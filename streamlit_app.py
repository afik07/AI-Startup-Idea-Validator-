import streamlit as st
from startup_report import generate_report

# ---------------- PAGE CONFIG ---------------- #

st.set_page_config(
    page_title="AI Startup Validator",
    page_icon="🚀",
    layout="wide"
)

# ---------------- SIDEBAR ---------------- #

st.sidebar.title("🚀 AI Startup Analyzer")

st.sidebar.info("""
### Built With

- 🤖 Gemini AI
- 🐍 Python
- 🎈 Streamlit

Version 2.0
""")

st.sidebar.markdown("---")
st.sidebar.write("Created by Vijayaragavan V")

# ---------------- MAIN PAGE ---------------- #

st.title("🚀 AI Startup Validator")

st.caption(
    "Validate your startup idea using Google's Gemini AI."
)

st.write(
    "Enter your startup idea below to receive a complete AI-generated startup analysis."
)

startup = st.text_input(
    "💡 Startup Idea",
    placeholder="Example: AI Fitness Coach"
)

# ---------------- BUTTON ---------------- #

if st.button("🚀 Analyze Startup", use_container_width=True):

    if startup.strip() == "":
        st.warning("Please enter a startup idea.")
        st.stop()

    try:

        with st.spinner("🤖 Gemini AI is analyzing your startup..."):
            report = generate_report(startup)

        st.success("✅ Analysis Completed Successfully!")

        st.markdown("---")

        st.markdown(report)

        st.markdown("---")

        st.info(
            "💡 This report was generated using Google's Gemini AI based on your startup idea."
        )

    except Exception as e:

        error_message = str(e)

        if "RESOURCE_EXHAUSTED" in error_message or "429" in error_message:

            st.error("""
### 🚫 Gemini API Quota Exceeded

You have reached the daily free-tier limit for the Gemini API.

**Possible Solutions**

- Wait until the daily quota resets.
- Upgrade to a paid Gemini API plan.
- Use a different API key with available quota.

Your application is working correctly. The API quota has simply been exhausted.
""")

        else:

            st.error("An unexpected error occurred.")
            st.code(error_message)