import time
import os
import subprocess
from watchdog.observers import Observer
from watchdog.events import FileSystemEventHandler

class AutoCommitHandler(FileSystemEventHandler):
    def __init__(self, repo_path):
        self.repo_path = repo_path

    def on_modified(self, event):
        self.commit_and_push()

    def on_created(self, event):
        self.commit_and_push()

    def on_deleted(self, event):
        self.commit_and_push()

    def on_moved(self, event):
        self.commit_and_push()

    def commit_and_push(self):
        os.chdir(self.repo_path)
        subprocess.run(['git', 'add', '.'])
        subprocess.run(['git', 'commit', '-m', 'Auto commit'])
        subprocess.run(['git', 'push'])

if __name__ == "__main__":
    repo_path = r'./' 
    event_handler = AutoCommitHandler(repo_path)
    observer = Observer()
    observer.schedule(event_handler, path=repo_path, recursive=True)
    observer.start()

    try:
        while True:
            time.sleep(1)
    except KeyboardInterrupt:
        observer.stop()
    observer.join()
