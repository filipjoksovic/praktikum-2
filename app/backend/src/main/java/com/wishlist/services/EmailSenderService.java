package com.wishlist.services;

import com.wishlist.services.interfaces.IEmailSender;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.mail.SimpleMailMessage;
import org.springframework.mail.javamail.JavaMailSender;
import org.springframework.stereotype.Service;

import java.util.logging.Logger;

@Service
public class EmailSenderService implements IEmailSender {

    Logger logger = Logger.getLogger(EmailSenderService.class.getName());
    @Value("${spring.mail.username}")
    private String from;
    private final JavaMailSender mailSender;
    private String newAccountMailTemplate = "Dear %s %s,\n\nThank you for creating an account! We're excited to have you on board.\n\nSincerely,\nNakupovalni List Team";
    private String invitationMailTemplate = "Dear %s %s,\n\nYou have been invited to join the family '%s' on our application.\n\nSincerely,\nNakupovalni List Team";

    public EmailSenderService(JavaMailSender mailSender) {
        this.mailSender = mailSender;
    }


    @Override
    public void sendNewAccountEmail(String email, String firstname, String lastname) {
        SimpleMailMessage message = new SimpleMailMessage();
        message.setFrom(from);
        message.setTo(email);
        message.setSubject("Welcome to Nakupovalni Listek");
        String mailMessage = String.format(newAccountMailTemplate, firstname, lastname);
        message.setText(mailMessage);
        mailSender.send(message);
        logger.info("Mail sent ..");
    }

    @Override
    public void sendInvitationEmail(String email, String inviteeName,String inviteeSurname, String familyName) {
        SimpleMailMessage message = new SimpleMailMessage();
        message.setFrom(from);
        message.setTo(email);
        message.setSubject("Invitation to Join Family");
        String mailMessage = String.format(invitationMailTemplate, inviteeName, inviteeSurname, familyName);
        message.setText(mailMessage);
        mailSender.send(message);
        logger.info("Mail sent ..");
    }
}
