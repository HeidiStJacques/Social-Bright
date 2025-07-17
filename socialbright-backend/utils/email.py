import os
import smtplib
import ssl
from email.message import EmailMessage
from dotenv import load_dotenv

load_dotenv()

def send_reset_email(to_email: str, reset_token: str):
    smtp_host = os.getenv("SMTP_HOST", "localhost")
    smtp_port = int(os.getenv("SMTP_PORT", "587"))
    smtp_user = os.getenv("SMTP_USERNAME", "")
    smtp_pass = os.getenv("SMTP_PASSWORD", "")
    from_email = os.getenv("FROM_EMAIL", "noreply@socialbright.org")
    frontend_url = os.getenv("FRONTEND_URL", "http://localhost:3000")

    reset_link = f"{frontend_url}/reset?token={reset_token}"

    msg = EmailMessage()
    msg["Subject"] = "Reset Your SocialBright Password"
    msg["From"] = from_email
    msg["To"] = to_email
    msg.set_content(
        f"Hello,\n\nClick the link below to reset your password:\n{reset_link}\n\nIf you didn't request this, ignore this email."
    )

    try:
        context = ssl.create_default_context()
        with smtplib.SMTP(smtp_host, smtp_port, timeout=10) as server:
            server.set_debuglevel(1)
            server.ehlo()
            server.starttls(context=context)
            server.ehlo()
            print(f"Connecting to {smtp_host}:{smtp_port} as {smtp_user}")
            print(f"Logging in as {smtp_user}")
            print(f"Password length: {len(smtp_pass)}")

            server.login(smtp_user, smtp_pass)
            server.send_message(msg)
            print("✅ Email sent successfully.")

    except smtplib.SMTPException as e:
        print(f"❌ Email sending failed (SMTP Error): {e}")
        raise
    except Exception as e:
        print(f"❌ Email sending failed (Unexpected Error): {e}")
        raise
