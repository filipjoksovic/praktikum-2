package com.wishlist.services;

import com.wishlist.dto.EmailSenderDTO;
import com.wishlist.services.interfaces.IEmailSender;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.mail.SimpleMailMessage;
import org.springframework.mail.javamail.JavaMailSender;
import org.springframework.stereotype.Service;

@Service
public class EmailSenderService implements IEmailSender {

    @Value("${spring.mail.username}")
    private String from;
    private final JavaMailSender mailSender;

    public EmailSenderService(JavaMailSender mailSender) {
        this.mailSender = mailSender;
    }

    @Override
    public EmailSenderDTO sendEmail(EmailSenderDTO dto) {
        SimpleMailMessage message = new SimpleMailMessage();
        message.setFrom(from);
        message.setTo(dto.getTo());
        message.setText(dto.getBody());
        message.setSubject(dto.getSubject());
        mailSender.send(message);
        System.out.println("Mail sent ..");
        return dto;
    }

}
