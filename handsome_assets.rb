module HandsomeAssets

  def self.environment root_path
    environment = Sprockets::Environment.new root_path
    environment.append_path 'build'
    environment.append_path 'styles'
    environment
  end
end
