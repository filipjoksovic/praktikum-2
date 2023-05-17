package com.wishlist.services.interfaces;

import com.wishlist.dto.EmailSenderDTO;

public interface IEmailSender {
    EmailSenderDTO sendEmail(EmailSenderDTO dto);
}
