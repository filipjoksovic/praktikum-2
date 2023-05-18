package com.wishlist.services.interfaces;

public interface IEmailSender {
    void sendNewAccountEmail(String email, String name, String surname);
    void sendInvitationEmail(String email, String inviteeName,String inviteeSurname,String familyName);
}
