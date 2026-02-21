# EmailJS Setup & Integration (Vite + React)

Follow these steps to create an EmailJS template, add the keys to your project, and ensure selected service data is sent with form submissions.

1) Create an EmailJS account
   - Go to https://www.emailjs.com/ and sign up.

2) Add an email service
   - In the EmailJS dashboard, add a service (e.g., Gmail, SMTP, etc.). Note the **Service ID** (e.g., `service_xxx`).

3) Create an email template
   - Create a new template and include the variables you want to receive in the email body.
   - Example template fields/HTML (in the EmailJS template editor):

```
Subject: New contact request from {{from_name}}

Message:
{{message}}

Selected Service: {{selected_service_name}}
Selected Price: ${{selected_service_price}}

Contact Email: {{from_email}}
Phone: {{phone}}
```

   - Make sure variable names match the keys sent from the client (`selected_service_name`, `selected_service_price`, `from_name`, `from_email`, `phone`, `message`).

4) Get your Public Key (User ID)
   - In EmailJS, under your account settings you'll find a **Public Key** (sometimes called user ID). You'll need this to initialize EmailJS client-side.

5) Add environment variables to your project (Vite)
   - Create a `.env` file in your project root (don't commit secrets to a public repo). For example:

```
VITE_EMAILJS_USER=your_public_key_here
VITE_EMAILJS_SERVICE_ID=service_xxx
VITE_EMAILJS_TEMPLATE_ID=template_xxx
```

   - Restart the dev server after adding `.env`.

6) Code integration (already applied in this project)
   - `src/components/Contact.jsx` reads `import.meta.env.VITE_EMAILJS_*` and falls back to the existing hardcoded IDs if env vars are missing.
   - The form submit includes `selected_service_name` and `selected_service_price` in the template payload so the template variables will be populated.

7) Test the form
   - Open the app, pick a service on the Services page, then submit the Reach Us form.
   - You should receive an email containing the selected service and price.

8) Troubleshooting
   - If you don't receive the email, check the browser console for errors.
   - Confirm the service ID, template ID, and public key in your `.env` match the values in EmailJS.
   - Make sure the EmailJS template uses the same variable names.

If you'd like, I can draft an example template message (HTML) for your EmailJS template or help you verify the template variables in your EmailJS dashboard.
