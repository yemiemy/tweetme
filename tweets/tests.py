from django.test import TestCase, client
from django.contrib.auth import get_user_model
from .models import Tweet

# rest_framework tests
from rest_framework.test import APIClient

# Create your tests here.

User = get_user_model()

class TweetTestCase(TestCase):
    def setUp(self):
        self.user = User.objects.create_user(username='test', password='somepassword')
        self.userb = User.objects.create_user(username='test2', password='somepassword')
        Tweet.objects.create(content="test 1", user=self.user)
        Tweet.objects.create(content="test 2", user=self.user)
        Tweet.objects.create(content="test 3", user=self.user)
        Tweet.objects.create(content="test 4", user=self.user)
        Tweet.objects.create(content="test 5", user=self.userb)

        self.current_count = Tweet.objects.count()
    def test_tweet_created_api_view(self):
        tweet = Tweet.objects.create(content="test 6", user=self.user)
        self.assertEqual(tweet.id, 6) 
        self.assertEqual(tweet.user, self.user) 
    
    def get_client(self):
        client = APIClient()
        client.login(username=self.user.username, password='somepassword')
        return client

    def test_tweet_list_api_view(self):
        client = self.get_client()
        response = client.get("/api/tweets/")
        self.assertEqual(response.status_code, 200)
        self.assertEqual(len(response.json()), 5)
    
    def test_action_like_api_view(self):
        client = self.get_client()
        response = client.post(
            "/api/tweets/action/", 
            {
                'id': 1,
                'action':'like',
                }, format='json')
        self.assertEqual(response.status_code, 200)
        likes_count = response.json().get('likes')
        self.assertEqual(likes_count, 1)
    
    def test_action_unlike_api_view(self):
        client = self.get_client()
        response = client.post(
            "/api/tweets/action/", 
            {
                'id': 2,
                'action':'like',
                }, format='json')
        self.assertEqual(response.status_code, 200)
        response = client.post(
            "/api/tweets/action/", 
            {
                'id': 2,
                'action':'unlike',
                }, format='json')
        self.assertEqual(response.status_code, 200)
        likes_count = response.json().get('likes')
        self.assertEqual(likes_count, 0)
    
    def test_action_retweet_api_view(self):
        client = self.get_client()
        response = client.post(
            "/api/tweets/action/", 
            {
                'id': 2,
                'action':'retweet',
                }, format='json')
        self.assertEqual(response.status_code, 201)
        parent = response.json().get('parent')
        self.assertEqual(parent.get('id'), 2)
    
    def test_tweet_create_api_view(self):
        client = self.get_client()
        response = client.post(
            "/api/tweets/create/", 
            {
                "content":"Test item 7"
            }, format="json")
        tweet_id = response.json().get('id')
        self.assertEqual(response.status_code, 201)
        self.assertEqual(tweet_id, self.current_count + 1)
    
    def test_tweet_detail_api_view(self):
        client = self.get_client()
        response = client.get("/api/tweets/2/")
        self.assertEqual(response.status_code, 200)
        self.assertEqual(response.json().get('id'), 2)

    def test_tweet_delete_api_view(self):
        client = self.get_client()
        response = client.delete("/api/tweets/2/delete/")
        self.assertEqual(response.status_code, 200)
        new_count = Tweet.objects.count()
        self.assertEqual(new_count, self.current_count-1)

        response_incorrect_owner = client.delete("/api/tweets/5/delete/")
        self.assertEqual(response_incorrect_owner.status_code, 401)