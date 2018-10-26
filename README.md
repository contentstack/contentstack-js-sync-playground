
## Build a playground app using Sync API with Contentstack’s JavaScript (Browser) SDK

This is a demo playground app built using Contentstack’s JavaScript SDK and Sync API. You can try out and play with our Sync API with this example app, before building bigger and better applications.

### Prerequisites
- [Contentstack account](https://app.contentstack.com/)
- [Basic knowledge of Contentstack](https://www.contentstack.com/docs/)


####  Step 1: Create a stack
Log in to your Contentstack account, and [create a new stack](https://www.contentstack.com/docs/guide/stack#create-a-new-stack). Read more about [stacks](https://www.contentstack.com/docs/guide/stack).

#### Step 2: Add a publishing environment
[Add a publishing environment](https://www.contentstack.com/docs/guide/environments#add-an-environment) to publish your content in Contentstack. Provide the necessary details as per your requirement. Read more about [environments](https://www.contentstack.com/docs/guide/environments).

#### Step 3: Import content types
For this app, we need just one content type: Session. Here’s what it’s needed for:

- Session: Lets you add the session content to your apps

For quick integration, we have already created the content type. [Download it](https://drive.google.com/open?id=1jnpNIHRb4kNcP3r0I2QMatGzPwNXxpzS) and [import](https://www.contentstack.com/docs/guide/content-types#importing-a-content-type) it to your stack. (If needed, you can create your own content type. Read more about [Content Types](https://www.contentstack.com/docs/guide/content-types))

Now that the content type is ready, let’s add some content for your Sync Playground app.

#### Step 4: Adding content
[Create](https://www.contentstack.com/docs/guide/content-management#add-a-new-entry) and [publish](https://www.contentstack.com/docs/guide/content-management#publish-an-entry) entries for the ‘Session’ content type.

Now that we have created the sample data, it’s time to use and configure the presentation layer.

#### Step 5: Set up and initialize JavaScript (browser) SDK
To set up and initialize Contentstack’s JavaScript (browser) SDK, refer to our [documentation here](https://www.contentstack.com/docs/platforms/javascript-browser).

####  Step 6: Clone and configure the application
To get your app up and running quickly, we have created a sample playground app. Clone the Github repo given below and change the configuration as per your need:

$ git clone [https://github.com/contentstack/contentstack-js-sync-playground.git](https://github.com/contentstack/contentstack-js-sync-playground.git)

Now add your Contentstack API Key, Delivery Token, and Environment within the custom.min.js file under the scripts folder of the web app during the SDK initialization step. (Find your [Stack's API Key](https://www.contentstack.com/docs/guide/stack#edit-a-stack) and [Delivery Token](https://www.contentstack.com/docs/guide/tokens#create-a-delivery-token).)

```
Stack = Contentstack.Stack({
    'api_key': ‘<API-KEY>’,
    'access_token': '<DELIVERY-TOKEN>',
    'environment': '<ENVIRONMENT>'
})
```

This will initiate your project.
### Step 7: Initialize sync 
To perform initial sync, use the sync method, which fetches all the content of the specified environment. 

```
let data = Stack.sync({“init”: true})
data.then(function(sync_data,  err) {
 // error for any error description
 // result.items: contains sync data
 // result.paginationToken:For fetching the next batch of entries using pagination token.
//result.syncToken: For performing subsequent sync after initial sync.        
if(err)throw err
})
```

   

On successful sync completion, you will get a sync token in response, which you need to use to get subsequent (delta) syncs. If the result has more than 100 records, it will return a pagination token. 
#### Step 8: Use pagination token
If the result of the initial sync contains more than 100 records, the response would be paginated. In that case, it returns the first batch of data and a pagination token. You can use this token to get the next batch of data.


```
let data = Stack.sync({"pagination_token": "<pagination_token>"})
data.then(function(result,  err) {
        //error for any error description
        //result.items: contains sync data
        //result.paginationToken: For fetching the next batch of entries using pagination token..
        //result.syncToken: For performing subsequent sync after initial sync.        
 if(err) throw err
})

```

  <img src="https://github.com/contentstack/contentstack-js-sync-playground/blob/master/images/screenshot_pagination.png"  height="500" width="1000">



####  Step 9: Publish new entries
In order to understand how you can also fetch only new (incremental) updates that were done since the last sync, you should create more entries and publish them. You can then use the Subsequent Sync call given below to see how it works.


#### Step 10: Perform subsequent sync 
In the response of the initial sync, you get a sync token. This token is used to fetch incremental updates, i.e., only the changes made after the initial sync. 

```
let data = Stack.sync({"sync_token" :  "<sync_token>"})
data.then(function(result,  err) {
     //error for any error description
     //result.items: contains sync data
     //result.paginationToken: For fetching the next batch of  entries using pagination token.
     //result.syncToken: For performing subsequent sync after initial sync.       
if(err) throw err
})
```


   
   <img src="https://github.com/contentstack/contentstack-js-sync-playground/blob/master/images/screenshot_sync.png"  height="500" width="1000">
   
   


#### More Resources
- [Getting started with JavaScript SDK](https://www.contentstack.com/docs/platforms/javascript-browser)
- [Using the Sync API with JavaScript SDK](https://www.contentstack.com/docs/guide/synchronization/using-the-sync-api-with-javascript-sdk)
- [Sync API documentation](https://www.contentstack.com/docs/apis/content-delivery-api/#synchronization)  
 
