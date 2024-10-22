// utils/analyzeText.ts
export const analyzeText = async (bookPK: string, fileContent: string) => {
  try {
    // First API call to analyze the text
    const analysisResponse = await fetch("/api/book/analyze", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ fileContent }),
    });

    if (!analysisResponse.ok) {
      throw new Error(`Analysis failed: ${analysisResponse.statusText}`);
    }

    const analysis = await analysisResponse.json();
    
    // Second API call to save the analysis results
    const saveResponse = await fetch("/api/book/save-analysis", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        bookPK,
        analysis,
      }),
    });

    if (!saveResponse.ok) {
      throw new Error(`Saving analysis failed: ${saveResponse.statusText}`);
    }

    const savedAnalysis = await saveResponse.json();
    return savedAnalysis;
  } catch (error) {
    const errorMessage = error instanceof Error ? error.message : "Unknown error occurred";
    console.error("Error in text analysis:", errorMessage);
    throw new Error(errorMessage);
  }
};