
import openai

# Load your API key from an environment variable or secret management service
openai.api_key ="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"

response = openai.Image.create(
  prompt="animated cartoon human",
  n=1,
  size="1024x1024"
)
image_url = response['data'][0]['url']

print(image_url)