import LocalizedStrings from 'react-native-localization';

export const localization = new LocalizedStrings({
  'en-US': {
    GLOBAL: {
      CANCEL_LABEL: 'Cancel',
      PROCEED_LABEL: 'Proceed',
      EMAIL_LABEL: 'Email',
      PASSWORD_LABEL: 'Password',
      APPROVE_LABEL: 'Approve',
      DENY_LABEL: 'Deny',
      REMIND_LABEL: 'Remind',
      ADD_NEW_ITEMS: 'Add new items',
      FAMILY_DETAILS_LABEL: 'Family details',
      EDIT_FAMILY_LABEL: 'Edit family',
      SUCCESS_LABEL: 'Success!',
      ITEM_NAME_LABEL: 'Item name',
      FIRST_NAME_LABEL: 'First name',
      LAST_NAME_LABEL: 'Last name',
      SAVE_LABEL: 'Save',
      LOGOUT_LABEL: 'Logout',
      FAMILY_LABEL: 'Family',
      PERSONAL_LABEL: 'Personal',
      NO_NAME_LABEL: 'No name',
      YES_LABEL: 'Yes',
      NO_LABEL: 'No',
      SHOPPING_LISTS: 'Shopping lists',
      SETTINGS_LABEL: 'Settings',
      NEW_LIST_LABEL: 'New list',
    },
    RECORDER: {
      TITLE: 'Record',
      DESCRIPTION:
        'Once you start recording, we will automatically create a shopping list for you.',
      WHEN_DONE_SPEAKING_MESSAGE:
        'When done speaking, press the button and the items will be added to the list.',
    },
    ACCOUNT: {
      DATE_OF_BIRTH_LABEL: 'Date of birth',
    },
    ACCOUNT_SETUP: {
      ABOUT_YOURSELF_MESSAGE:
        " Though, before you begin using the application, we'll need you to tell us a bit about yourself ",
      WELCOME_MESSAGE: 'Welcome to WishList!',
      PLEASURE_TO_MEET_YOU_MESSAGE: "It's a pleasure to meet you",
    },
    LOGIN: {
      LOGIN_LABEL: 'Log in',
      NO_ACCOUNT_LABEL: 'No account? Register here?',
    },
    REGISTER: {
      REGISTER_LABEL: 'Register',
      EXISTING_ACCOUNT_LABEL: 'Already have an account? Login here',
    },
    FAMILY: {
      JOIN_CODE_LABEL: 'Invite code:',
      REMOVE_FROM_FAMILY: 'Remove from family',
      EDIT_FAMILY_LABEL: 'Edit family',
      FAMILY_NAME_LABEL: 'Family name',
      JOIN_REQUESTS_LABEL: 'Join requests',
      MEMBERS_LABEL: 'Family members',
      SHOPPING_LIST_LABEL: 'Shopping list',
      NO_JOIN_REQUESTS_LABEL: 'No join requests for family',
      MEMBERS: {
        DESCRIPTIVE_MESSAGE:
          'Here you can see family members who can create, update and edit the shopping list and its items.',
        EMPTY_FAMILY_LABEL:
          'Currently there are no family members other than you.',
        SHARE_FAMILY_CODE_MESSAGE:
          'You can share your family code with them or invite them via email',
      },
      SEND_REQUEST_LABEL: 'Send family join request',
    },
    USER: {
      NO_FIRST_NAME_LABEL: 'No first name',
      NO_LAST_NAME_LABEL: 'No last name',
    },
    SHOPPING_LIST: {
      ADDED_BY_LABEL: 'Added by',
      EMPTY_LIST_LABEL:
        'Your shopping list is currently empty. Go to the recorder page to add some items',
      CREATE: {
        DATA_PROCESS_SUCCESS_MESSAGE:
          'Your data has been successfuly been processed. You can go over the list one more time to add or remove items, and then create the list.',
        ONE_LIST_PER_FAMILY_MESSAGE:
          'Only one list exists per family. If the list already exists, the data will be updated while avoiding duplicates.',
        CREATE_SUCCESS_MESSAGE: 'Successfully created shopping list',
        CREATE_FAIL_MESSAGE: 'Error occurred when creating shopping list',
        CREATE_FAMILY_LIST_SUCCESS_MESSAGE:
          'Successfully created family shopping list',
        CREATE_FAMILY_LIST_FAIL_MESSAGE:
          'Error occurred when creating family shopping list',
      },
      ADD_ITEMS_FAIL_MESSAGE: 'Error occurred when adding items.',
      NO_LISTS_MESSAGE: 'No shopping lists',
      CHECK_OFF_WHOLE_LIST_MESSAGE_PART_1:
        'Check off whole list? All of the items on ',
      CHECK_OFF_WHOLE_LIST_MESSAGE_PART_2: ' will be checked off',
      DELETE_WHOLE_LIST_MESSAGE_PART_1:
        'Delete whole list? All of the items on ',
      DELETE_WHOLE_LIST_MESSAGE_PART_2: ' will be deleted.',
      CHECK_OFF_LIST_ITEM: 'Check off ',
      DELETE_LIST_ITEM: 'Delete ',
      LIST_DELETED_SUCCESS_MESSAGE: 'List successfully deleted',
    },
    LOADER: {
      TRANSCRIPT_RECEIVED_MESSAGE: 'Transcript received. Processing data...',
      ROBOTS_PROCESSING_MESSAGE:
        'Robots are processing your voice, stay patient...',
      ROBOTS_PROCESSING_LIST_MESSAGE:
        'Robots are processing the transcribed list...',
    },
    SNACKBAR: {
      ADD_ITEMS_ERROR_MESSAGE: "Couldn't add items",
      REMINDER_CREATED_MESSAGE: 'Reminder created',
      DATA_PARSE_SUCCESS: 'Data successfully parsed!',
      DATA_PARSE_FAIL: 'Error occurred when parsing data',
    },
    NOTIFICATIONS: {
      LOOK_AT_FAMILY_LIST_TITLE: 'List reminder',
      LOOK_AT_FAMILY_LIST_NOTIFICATION_PART_1:
        'This is a reminder to look at your family ',
      LOOK_AT_FAMILY_LIST_NOTIFICATION_PART_2: ' list',
    },
    TRANSCRIPTION: {
      TRANSCRIPT_COMPLETE_MESSAGE: 'Transcription complete',
      TRANSCRIPT_COMPLETE_DESCRIPTIVE_MESSAGE:
        'Here is the transcription based on your voice recording. If something is off, you can always edit it to your liking.',
    },
  },
  en: {
    GLOBAL: {
      CANCEL_LABEL: 'Cancel',
      PROCEED_LABEL: 'Proceed',
      EMAIL_LABEL: 'Email',
      PASSWORD_LABEL: 'Password',
      APPROVE_LABEL: 'Approve',
      DENY_LABEL: 'Deny',
      REMIND_LABEL: 'Remind',
      ADD_NEW_ITEMS: 'Add new items',
      FAMILY_DETAILS_LABEL: 'Family details',
      EDIT_FAMILY_LABEL: 'Edit family',
      SUCCESS_LABEL: 'Success!',
      ITEM_NAME_LABEL: 'Item name',
      FIRST_NAME_LABEL: 'First name',
      LAST_NAME_LABEL: 'Last name',
      SAVE_LABEL: 'Save',
      LOGOUT_LABEL: 'Logout',
      FAMILY_LABEL: 'Family',
      PERSONAL_LABEL: 'Personal',
      NO_NAME_LABEL: 'No name',
      YES_LABEL: 'Yes',
      NO_LABEL: 'No',
    },
    RECORDER: {
      TITLE: 'Record',
      DESCRIPTION:
        'Once you start recording, we will automatically create a shopping list for you.',
      WHEN_DONE_SPEAKING_MESSAGE:
        'When done speaking, press the button and the items will be added to the list.',
    },
    ACCOUNT: {
      DATE_OF_BIRTH_LABEL: 'Date of birth',
    },
    ACCOUNT_SETUP: {
      ABOUT_YOURSELF_MESSAGE:
        " Though, before you begin using the application, we'll need you to tell us a bit about yourself ",
      WELCOME_MESSAGE: 'Welcome to WishList!',
      PLEASURE_TO_MEET_YOU_MESSAGE: "It's a pleasure to meet you",
    },
    LOGIN: {
      LOGIN_LABEL: 'Log in',
      NO_ACCOUNT_LABEL: 'No account? Register here?',
    },
    REGISTER: {
      REGISTER_LABEL: 'Register',
      EXISTING_ACCOUNT_LABEL: 'Already have an account? Login here',
    },
    FAMILY: {
      JOIN_CODE_LABEL: 'Invite code:',
      REMOVE_FROM_FAMILY: 'Remove from family',
      EDIT_FAMILY_LABEL: 'Edit family',
      FAMILY_NAME_LABEL: 'Family name',
      JOIN_REQUESTS_LABEL: 'Join requests',
      MEMBERS_LABEL: 'Family members',
      SHOPPING_LIST_LABEL: 'Shopping list',
      NO_JOIN_REQUESTS_LABEL: 'No join requests for family',
      MEMBERS: {
        DESCRIPTIVE_MESSAGE:
          'Here you can see family members who can create, update and edit the shopping list and its items.',
        EMPTY_FAMILY_LABEL:
          'Currently there are no family members other than you.',
        SHARE_FAMILY_CODE_MESSAGE:
          'You can share your family code with them or invite them via email',
      },
      SEND_REQUEST_LABEL: 'Send family join request',
    },
    USER: {
      NO_FIRST_NAME_LABEL: 'No first name',
      NO_LAST_NAME_LABEL: 'No last name',
    },
    SHOPPING_LIST: {
      ADDED_BY_LABEL: 'Added by',
      EMPTY_LIST_LABEL:
        'Your shopping list is currently empty. Go to the recorder page to add some items',
      CREATE: {
        DATA_PROCESS_SUCCESS_MESSAGE:
          'Your data has been successfuly been processed. You can go over the list one more time to add or remove items, and then create the list.',
        ONE_LIST_PER_FAMILY_MESSAGE:
          'Only one list exists per family. If the list already exists, the data will be updated while avoiding duplicates.',
        CREATE_SUCCESS_MESSAGE: 'Successfully created shopping list',
        CREATE_FAIL_MESSAGE: 'Error occurred when creating shopping list',
        CREATE_FAMILY_LIST_SUCCESS_MESSAGE:
          'Successfully created family shopping list',
        CREATE_FAMILY_LIST_FAIL_MESSAGE:
          'Error occurred when creating family shopping list',
      },
      ADD_ITEMS_FAIL_MESSAGE: 'Error occurred when adding items.',
      NO_LISTS_MESSAGE: 'No shopping lists',
      CHECK_OFF_WHOLE_LIST_MESSAGE_PART_1:
        'Check off whole list? All of the items on ',
      CHECK_OFF_WHOLE_LIST_MESSAGE_PART_2: ' will be checked off',
      DELETE_WHOLE_LIST_MESSAGE_PART_1:
        'Delete whole list? All of the items on ',
      DELETE_WHOLE_LIST_MESSAGE_PART_2: ' will be deleted.',
      CHECK_OFF_LIST_ITEM: 'Check off ',
      DELETE_LIST_ITEM: 'Delete ',
      LIST_DELETED_SUCCESS_MESSAGE: 'List successfully deleted',
    },
    LOADER: {
      TRANSCRIPT_RECEIVED_MESSAGE: 'Transcript received. Processing data...',
      ROBOTS_PROCESSING_MESSAGE:
        'Robots are processing your voice, stay patient...',
      ROBOTS_PROCESSING_LIST_MESSAGE:
        'Robots are processing the transcribed list...',
    },
    SNACKBAR: {
      ADD_ITEMS_ERROR_MESSAGE: "Couldn't add items",
      REMINDER_CREATED_MESSAGE: 'Reminder created',
      DATA_PARSE_SUCCESS: 'Data successfully parsed!',
      DATA_PARSE_FAIL: 'Error occurred when parsing data',
    },
    NOTIFICATIONS: {
      LOOK_AT_FAMILY_LIST_TITLE: 'List reminder',
      LOOK_AT_FAMILY_LIST_NOTIFICATION_PART_1:
        'This is a reminder to look at your family ',
      LOOK_AT_FAMILY_LIST_NOTIFICATION_PART_2: ' list',
    },
    TRANSCRIPTION: {
      TRANSCRIPT_COMPLETE_MESSAGE: 'Transcription complete',
      TRANSCRIPT_COMPLETE_DESCRIPTIVE_MESSAGE:
        'Here is the transcription based on your voice recording. If something is off, you can always edit it to your liking.',
    },
  },
  si: {
    GLOBAL: {
      CANCEL_LABEL: 'Prekliči',
      PROCEED_LABEL: 'Nadaljuj',
      EMAIL_LABEL: 'E-naslov',
      PASSWORD_LABEL: 'Geslo',
      APPROVE_LABEL: 'Odobri',
      DENY_LABEL: 'Zanikaj',
      REMIND_LABEL: 'Opomni me',
      ADD_NEW_ITEMS: 'Dodajte nove izdelke',
      FAMILY_DETAILS_LABEL: 'Družinski podatki',
      EDIT_FAMILY_LABEL: 'Uredi družino',
      SUCCESS_LABEL: 'Uspeh!',
      ITEM_NAME_LABEL: 'Ime izdelka',
      FIRST_NAME_LABEL: 'Ime',
      LAST_NAME_LABEL: 'Priimek',
      SAVE_LABEL: 'Shrani',
      LOGOUT_LABEL: 'Odjavi se',
      FAMILY_LABEL: 'Družinski listek',
      PERSONAL_LABEL: 'Osebni listek',
      NO_NAME_LABEL: 'Brez imena',
      YES_LABEL: 'Ja',
      NO_LABEL: 'Ne',
      SHOPPING_LISTS: 'Nakupovalni listki',
      SETTINGS_LABEL: 'Nastavitve',
      NEW_LIST_LABEL: 'Novi listek',
    },
    RECORDER: {
      TITLE: 'Posnemi',
      DESCRIPTION:
        'Ko začnete snemati, bomo za vas samodejno ustvarili nakupovalni seznam.',
      WHEN_DONE_SPEAKING_MESSAGE:
        'Ko končate z govorom, pritisnite gumb in izdelki bodo dodani na seznam.',
    },
    ACCOUNT: {
      DATE_OF_BIRTH_LABEL: 'Datum rojstva',
    },
    ACCOUNT_SETUP: {
      ABOUT_YOURSELF_MESSAGE:
        'Toda preden začnete uporabljati aplikacijo, nam lahko povedate nekaj o sebi',
      WELCOME_MESSAGE: 'Dobrodošli na WishList!',
      PLEASURE_TO_MEET_YOU_MESSAGE: 'Nas veseli da ste nas izbrali!',
    },
    LOGIN: {
      LOGIN_LABEL: 'Prijavi se',
      NO_ACCOUNT_LABEL: 'Nimate račun? Registrirajte se tukaj',
    },
    REGISTER: {
      REGISTER_LABEL: 'Registrirajte se',
      EXISTING_ACCOUNT_LABEL: 'Že imate račun? Prijavite se tukaj',
    },
    FAMILY: {
      JOIN_CODE_LABEL: 'Koda povabila:',
      REMOVE_FROM_FAMILY: 'Odstrani iz družine',
      EDIT_FAMILY_LABEL: 'Uredi družino',
      FAMILY_NAME_LABEL: 'Ime družine',
      JOIN_REQUESTS_LABEL: 'Zahteve za pridružitev',
      MEMBERS_LABEL: 'Družinski člani',
      SHOPPING_LIST_LABEL: 'Nakupovalni listek',
      NO_JOIN_REQUESTS_LABEL: 'Trenutno ni prošenj za pridružitev družini',
      MEMBERS: {
        DESCRIPTIVE_MESSAGE:
          'Tukaj si lahko ogledate družinske člane, ki lahko ustvarjajo, posodabljajo in urejajo nakupovalni listek in njegove artikle.',
        EMPTY_FAMILY_LABEL: 'Trenutno ni nobenega družinskega člana razen Vas.',
        SHARE_FAMILY_CODE_MESSAGE:
          'Z njimi lahko delite svojo družinsko kodo ali jih povabite po e-pošti',
      },
      SEND_REQUEST_LABEL: 'Pošlji zahtevo za pridružitev družini',
    },
    USER: {
      NO_FIRST_NAME_LABEL: 'Brez imena',
      NO_LAST_NAME_LABEL: 'Brez priimka',
    },
    SHOPPING_LIST: {
      ADDED_BY_LABEL: 'Dodal:',
      EMPTY_LIST_LABEL:
        'Your shopping list is currently empty. Go to the recorder page to add some items',
      CREATE: {
        DATA_PROCESS_SUCCESS_MESSAGE:
          'Vaš nakupovalni seznam je trenutno prazen. Pojdite na snemalnik, da dodate nekaj izdelkov',
        ONE_LIST_PER_FAMILY_MESSAGE:
          'Na družino obstaja samo en seznam. Če seznam že obstaja, bodo podatki posodobljeni brez dvojnikov.',
        CREATE_SUCCESS_MESSAGE: 'Nakupovalni seznam je bil uspešno ustvarjen',
        CREATE_FAIL_MESSAGE:
          'Pri ustvarjanju nakupovalnega seznama je prišlo do napake',
        CREATE_FAMILY_LIST_SUCCESS_MESSAGE:
          'Successfully created family shopping list',
        CREATE_FAMILY_LIST_FAIL_MESSAGE:
          'Uspešno ustvarjen družinski nakupovalni seznam',
      },
      ADD_ITEMS_FAIL_MESSAGE: 'Pri dodajanju elementov je prišlo do napake.',
      NO_LISTS_MESSAGE: 'Brez nakupovalnih listkov',
      CHECK_OFF_WHOLE_LIST_MESSAGE_PART_1:
        'Odkljukati celoten listek? Vsi predmeti na',
      CHECK_OFF_WHOLE_LIST_MESSAGE_PART_2: ' bodo bili odkljukani',
      DELETE_WHOLE_LIST_MESSAGE_PART_1:
        'Izbrisati celoten seznam? Vsi izdelki na ',
      DELETE_WHOLE_LIST_MESSAGE_PART_2: ' bodo bili izbrisani.',
      CHECK_OFF_LIST_ITEM: 'Odkljukati ',
      DELETE_LIST_ITEM: 'Izbrisati ',
      LIST_DELETED_SUCCESS_MESSAGE: 'Listek uspešno izbrisan',
    },
    LOADER: {
      TRANSCRIPT_RECEIVED_MESSAGE: 'Prejet prepis. Obdelava podatkov...',
      ROBOTS_PROCESSING_MESSAGE:
        'Roboti obdelujejo vaš glas, bodite potrpežljivi...',
      ROBOTS_PROCESSING_LIST_MESSAGE: 'Roboti obdelujejo prepisani seznam...',
    },
    SNACKBAR: {
      ADD_ITEMS_ERROR_MESSAGE: 'Izdelkov ni bilo mogoče dodati',
      REMINDER_CREATED_MESSAGE: 'Opomnik ustvarjen',
      DATA_PARSE_SUCCESS: 'Podatki uspešno razčlenjeni!',
      DATA_PARSE_FAIL: 'Pri razčlenjevanju podatkov je prišlo do napake',
    },
    NOTIFICATIONS: {
      LOOK_AT_FAMILY_LIST_TITLE: 'Opomnik',
      LOOK_AT_FAMILY_LIST_NOTIFICATION_PART_1: 'To je opomnik, da pogledate ',
      LOOK_AT_FAMILY_LIST_NOTIFICATION_PART_2: ' družinski listek',
    },
    TRANSCRIPTION: {
      TRANSCRIPT_COMPLETE_MESSAGE: 'Transkripcija končana',
      TRANSCRIPT_COMPLETE_DESCRIPTIVE_MESSAGE:
        'Tukaj je prepis, ki temelji na vašem glasovnem posnetku. Če nekaj ni v redu, lahko to vedno uredite po svojih željah.',
    },
  },
});
